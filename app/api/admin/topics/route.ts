import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { BLOG_TOPICS } from "@/lib/blog-topics";

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS blog_topics (
      id        SERIAL PRIMARY KEY,
      topic     TEXT        NOT NULL,
      category  VARCHAR(50) NOT NULL DEFAULT 'education',
      status    VARCHAR(20) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  // Sync: add any topics from BLOG_TOPICS that aren't already in DB
  const { rows: existing } = await sql`SELECT topic FROM blog_topics`;
  const existingSet = new Set(existing.map((r) => r.topic as string));
  for (const t of BLOG_TOPICS) {
    if (!existingSet.has(t.topic)) {
      await sql`
        INSERT INTO blog_topics (topic, category)
        VALUES (${t.topic}, ${t.category})
      `;
    }
  }
}

export async function GET() {
  try {
    await ensureTable();
    const { rows } = await sql`
      SELECT * FROM blog_topics ORDER BY status ASC, created_at ASC
    `;
    return NextResponse.json({ topics: rows });
  } catch (err) {
    console.error("[admin/topics] GET error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { topic, category } = (await req.json()) as {
    topic: string;
    category: string;
  };
  if (!topic?.trim() || !category) {
    return NextResponse.json(
      { error: "topic and category required" },
      { status: 400 }
    );
  }
  try {
    await ensureTable();
    const { rows } = await sql`
      INSERT INTO blog_topics (topic, category)
      VALUES (${topic.trim()}, ${category})
      RETURNING *
    `;
    return NextResponse.json({ topic: rows[0] });
  } catch (err) {
    console.error("[admin/topics] POST error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = (await req.json()) as { id: number };
  try {
    await sql`DELETE FROM blog_topics WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/topics] DELETE error:", err);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
