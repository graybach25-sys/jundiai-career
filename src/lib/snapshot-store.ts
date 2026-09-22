import { timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { normalizeData } from "./normalize";
import { createShareCode, createWriteKey, isShareCode } from "./share-code";
import type { AppData } from "./types";

const MAX_BYTES = 350_000;
const BLOB_PREFIX = "novo-capitulo";

export type PublicSnapshot = {
  code: string;
  updatedAt: string;
  data: AppData;
};

type StoredSnapshot = PublicSnapshot & {
  v: 1;
  writeKey: string;
};

export class SnapshotError extends Error {
  readonly code: "not_found" | "forbidden" | "unconfigured" | "invalid" | "too_large";

  constructor(
    code: "not_found" | "forbidden" | "unconfigured" | "invalid" | "too_large",
    message: string,
  ) {
    super(message);
    this.code = code;
  }
}

function blobReady() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function storeMode(): "blob" | "file" | "unconfigured" {
  if (blobReady()) return "blob";
  if (process.env.VERCEL) return "unconfigured";
  return "file";
}

function pathnameFor(code: string) {
  return `${BLOB_PREFIX}/${code}.json`;
}

function fileDir() {
  return process.env.SNAPSHOT_DIR || path.join(process.cwd(), ".data", "shares");
}

function keysMatch(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length || left.length === 0) return false;
  return timingSafeEqual(left, right);
}

async function readStored(code: string): Promise<StoredSnapshot | null> {
  const mode = storeMode();
  if (mode === "unconfigured") {
    throw new SnapshotError("unconfigured", "BLOB_READ_WRITE_TOKEN is not set");
  }
  if (mode === "file") {
    try {
      const raw = await readFile(path.join(fileDir(), `${code}.json`), "utf8");
      return JSON.parse(raw) as StoredSnapshot;
    } catch {
      return null;
    }
  }

  const { get } = await import("@vercel/blob");
  try {
    const result = await get(pathnameFor(code), { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const raw = await new Response(result.stream).text();
    return JSON.parse(raw) as StoredSnapshot;
  } catch (error) {
    const name = error instanceof Error ? error.name : "";
    if (name === "BlobNotFoundError") return null;
    throw error;
  }
}

async function writeStored(record: StoredSnapshot) {
  const mode = storeMode();
  if (mode === "unconfigured") {
    throw new SnapshotError("unconfigured", "BLOB_READ_WRITE_TOKEN is not set");
  }
  const body = JSON.stringify(record);
  if (mode === "file") {
    const dir = fileDir();
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, `${record.code}.json`), body, "utf8");
    return;
  }

  const { put } = await import("@vercel/blob");
  await put(pathnameFor(record.code), body, {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

export async function readPublicSnapshot(code: string): Promise<PublicSnapshot> {
  if (!isShareCode(code)) throw new SnapshotError("invalid", "Invalid code");
  const stored = await readStored(code);
  if (!stored?.data || !stored.updatedAt) throw new SnapshotError("not_found", "Not found");
  return {
    code,
    updatedAt: stored.updatedAt,
    data: normalizeData(stored.data),
  };
}

export async function saveSnapshot(input: {
  data: unknown;
  code?: string;
  writeKey?: string;
  forceNew?: boolean;
}): Promise<PublicSnapshot & { writeKey: string; created: boolean }> {
  const encoded = JSON.stringify(input.data ?? null);
  if (encoded.length > MAX_BYTES) throw new SnapshotError("too_large", "Snapshot is too large");

  const data = normalizeData(input.data);
  const now = new Date().toISOString();
  let code = input.forceNew ? "" : input.code || "";
  let writeKey = input.forceNew ? "" : input.writeKey || "";
  let created = false;

  if (code) {
    if (!isShareCode(code)) throw new SnapshotError("invalid", "Invalid code");
    const existing = await readStored(code);
    if (existing) {
      if (!writeKey || !keysMatch(existing.writeKey, writeKey)) {
        throw new SnapshotError("forbidden", "Write key does not match");
      }
    } else {
      created = true;
      if (!writeKey) writeKey = createWriteKey();
    }
  } else {
    created = true;
    code = createShareCode();
    writeKey = createWriteKey();
    for (let attempt = 0; attempt < 3; attempt++) {
      const clash = await readStored(code);
      if (!clash) break;
      code = createShareCode();
    }
  }

  const record: StoredSnapshot = {
    v: 1,
    code,
    writeKey,
    updatedAt: now,
    data,
  };
  await writeStored(record);
  return { code, writeKey, updatedAt: now, data, created };
}
