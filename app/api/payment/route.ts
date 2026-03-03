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
    };

    const { name, email, birthDate, birthTime, gender } = body;

    if (!name || !email || !birthDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // orderId: Toss requires 6–64 chars, alphanumeric + _ -
    const orderId = `kf_${randomUUID().replace(/-/g, "").slice(0, 24)}`;

    await sql`
      INSERT INTO orders (order_id, name, email, birth_date, birth_time, gender, amount, status)
      VALUES (
        ${orderId},
        ${name},
        ${email},
        ${birthDate},
        ${birthTime ?? "unknown"},
        ${gender ?? "unknown"},
        35,
        'pending'
      )
    `;

    return NextResponse.json({ orderId });
  } catch (err) {
    console.error("[payment] create order error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
