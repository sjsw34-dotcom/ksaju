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
  // Seed from static array if table is empty
  const { rows } = await sql`SELECT COUNT(*) AS count FROM blog_topics`;
  if (Number(rows[0].count) === 0) {
    for (const t of BLOG_TOPICS) {
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
