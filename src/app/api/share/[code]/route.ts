import { NextResponse } from "next/server";
import { normalizeCode } from "@/lib/share-code";
import { readPublicSnapshot, SnapshotError } from "@/lib/snapshot-store";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ code: string }> }) {
  const { code: raw } = await context.params;
  const code = normalizeCode(raw);
  try {
    const snapshot = await readPublicSnapshot(code);
    return NextResponse.json(
      { code: snapshot.code, updatedAt: snapshot.updatedAt, data: snapshot.data },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    if (error instanceof SnapshotError) {
      const status = error.code === "not_found" ? 404 : error.code === "unconfigured" ? 503 : 400;
      return NextResponse.json({ error: error.code }, { status, headers: { "Cache-Control": "no-store" } });
    }
    return NextResponse.json({ error: "share_failed" }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
