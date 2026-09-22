import { NextResponse } from "next/server";
import { normalizeCode } from "@/lib/share-code";
import { saveSnapshot, SnapshotError } from "@/lib/snapshot-store";

export const dynamic = "force-dynamic";

function errorStatus(error: SnapshotError) {
  if (error.code === "not_found") return 404;
  if (error.code === "forbidden") return 403;
  if (error.code === "too_large") return 413;
  if (error.code === "unconfigured") return 503;
  return 400;
}

export async function POST(request: Request) {
  let body: {
    data?: unknown;
    code?: unknown;
    writeKey?: unknown;
    forceNew?: unknown;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const code = typeof body.code === "string" ? normalizeCode(body.code) : "";
    const saved = await saveSnapshot({
      data: body.data,
      code: code || undefined,
      writeKey: typeof body.writeKey === "string" ? body.writeKey : undefined,
      forceNew: body.forceNew === true,
    });
    return NextResponse.json(
      {
        code: saved.code,
        writeKey: saved.writeKey,
        updatedAt: saved.updatedAt,
        path: `/ver/${saved.code}`,
        created: saved.created,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof SnapshotError) {
      return NextResponse.json({ error: error.code }, { status: errorStatus(error) });
    }
    return NextResponse.json({ error: "share_failed" }, { status: 500 });
  }
}
