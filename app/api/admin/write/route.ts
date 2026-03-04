import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notifyGoogleIndexing } from "@/lib/google-indexing";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function POST(req: NextRequest) {
  // ── Auth ──
  const authHeader = req.headers.get("authorization") ?? "";
  const cronSecret = process.env.CRON_SECRET ?? "";
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, category, meta, content, imageUrl } = (await req.json()) as {
    title: string;
    category: string;
    meta: string;
    content: string;
    imageUrl?: string;
  };

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "title and content are required" },
      { status: 400 }
    );
  }

  const slug = toSlug(title);

  try {
    await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image_url TEXT`;
    await sql`
      INSERT INTO blog_posts (slug, title, meta, content, category, topic, image_url)
      VALUES (
        ${slug},
        ${title.trim()},
        ${meta?.trim() ?? ""},
        ${content.trim()},
        ${category ?? "education"},
        ${"manual"},
        ${imageUrl?.trim() || null}
      )
    `;

    revalidatePath("/blog");

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.sajumuse.com";
    notifyGoogleIndexing(`${baseUrl}/blog/${slug}`).catch(() => {});

    return NextResponse.json({ success: true, slug });
  } catch (err) {
    console.error("[admin/write] error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
