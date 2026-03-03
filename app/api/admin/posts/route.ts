import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, slug, title, category, created_at
      FROM blog_posts
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ posts: rows });
  } catch (err) {
    console.error("[admin/posts] GET error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = (await req.json()) as { id: number };
  try {
    await sql`DELETE FROM blog_posts WHERE id = ${id}`;
    revalidatePath("/blog");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/posts] DELETE error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
