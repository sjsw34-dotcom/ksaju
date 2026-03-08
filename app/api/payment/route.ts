import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name: string;
      email: string;
      birthDate: string;
      birthTime: string;
      gender: string;
      product?: string;
    };

    const { name, email, birthDate, birthTime, gender, product } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const amount = product === "love" ? 19 : 29;

    // orderId: Toss requires 6–64 chars, alphanumeric + _ -
    const prefix = product === "love" ? "lv_" : "kf_";
    const orderId = `${prefix}${randomUUID().replace(/-/g, "").slice(0, 24)}`;

    await sql`
      INSERT INTO orders (order_id, name, email, birth_date, birth_time, gender, amount, status)
      VALUES (
        ${orderId},
        ${name},
        ${email},
        ${birthDate || "unknown"},
        ${birthTime ?? "unknown"},
        ${gender ?? "unknown"},
        ${amount},
        'pending'
      )
    `;

    return NextResponse.json({ orderId });
  } catch (err) {
    console.error("[payment] create order error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
