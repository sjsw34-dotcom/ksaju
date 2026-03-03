import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      paymentKey: string;
      orderId: string;
      amount: number;
    };

    const { paymentKey, orderId, amount } = body;

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json({ error: "Missing payment parameters" }, { status: 400 });
    }

    // Idempotency: return success if already confirmed
    const { rows } = await sql`
      SELECT * FROM orders WHERE order_id = ${orderId}
    `;
    const order = rows[0];

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status === "paid") {
      return NextResponse.json({ success: true });
    }

    // Confirm payment with Toss API
    const tossRes = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });

    if (!tossRes.ok) {
      const err = (await tossRes.json()) as { message?: string };
      console.error("[payment] toss confirm error:", err);
      return NextResponse.json(
        { error: err.message ?? "Payment confirmation failed" },
        { status: 400 }
      );
    }

    // Update order status in DB
    await sql`
      UPDATE orders
      SET status = 'paid', payment_key = ${paymentKey}, updated_at = NOW()
      WHERE order_id = ${orderId}
    `;

    // Send emails (non-blocking — don't fail if email fails)
    try {
      if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await Promise.all([
        // Customer confirmation
        resend.emails.send({
          from: "Unmyung Therapy <noreply@k-fortune.com>",
          to: order.email as string,
          subject: "Your Unmyung Therapy Premium Report is Confirmed ✦",
          html: customerEmailHtml({
            name: order.name as string,
            birthDate: order.birth_date as string,
            birthTime: order.birth_time as string,
          }),
        }),
        // Admin notification
        resend.emails.send({
          from: "Unmyung Therapy <noreply@k-fortune.com>",
          to: process.env.MASTER_EMAIL!,
          subject: `✦ New Order — ${order.name}`,
          html: adminEmailHtml({
            name: order.name as string,
            email: order.email as string,
            birthDate: order.birth_date as string,
            birthTime: order.birth_time as string,
            gender: order.gender as string,
            orderId,
            paymentKey,
          }),
        }),
      ]);
    } catch (emailErr) {
      console.error("[payment] email send error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[payment] confirm error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function customerEmailHtml({
  name,
  birthDate,
  birthTime,
}: {
  name: string;
  birthDate: string;
  birthTime: string;
}) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#1A1A2E;border-radius:16px;overflow:hidden;">
        <tr><td style="background:linear-gradient(135deg,#7C3AED,#F59E0B);padding:4px;"></td></tr>
        <tr><td style="padding:40px;">
          <p style="color:#F59E0B;font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;margin:0 0 12px;">Unmyung Therapy</p>
          <h1 style="font-size:24px;font-weight:700;margin:0 0 8px;">Your order is confirmed ✦</h1>
          <p style="color:#9CA3AF;margin:0 0 32px;">Hi ${name}, your premium Saju report is on its way.</p>

          <table width="100%" cellpadding="12" cellspacing="0" style="background:#0A0A0F;border-radius:12px;margin-bottom:32px;">
            <tr><td style="color:#6B7280;font-size:13px;">Name</td><td style="text-align:right;font-weight:600;">${name}</td></tr>
            <tr><td style="color:#6B7280;font-size:13px;border-top:1px solid #2A2A4A;">Birth Date</td><td style="text-align:right;font-weight:600;border-top:1px solid #2A2A4A;">${birthDate}</td></tr>
            <tr><td style="color:#6B7280;font-size:13px;border-top:1px solid #2A2A4A;">Birth Time</td><td style="text-align:right;font-weight:600;border-top:1px solid #2A2A4A;">${birthTime}</td></tr>
            <tr><td style="color:#6B7280;font-size:13px;border-top:1px solid #2A2A4A;">Amount</td><td style="text-align:right;font-weight:600;color:#F59E0B;border-top:1px solid #2A2A4A;">₩35,000</td></tr>
          </table>

          <p style="color:#D1D5DB;font-size:14px;line-height:1.7;margin:0 0 24px;">
            Our master readers are preparing your full Four Pillars analysis. Your personalized report will be delivered to this email address <strong style="color:#ffffff;">within 24 hours</strong>.
          </p>

          <p style="color:#6B7280;font-size:12px;margin:0;">Questions? Reply to this email anytime.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function adminEmailHtml({
  name,
  email,
  birthDate,
  birthTime,
  gender,
  orderId,
  paymentKey,
}: {
  name: string;
  email: string;
  birthDate: string;
  birthTime: string;
  gender: string;
  orderId: string;
  paymentKey: string;
}) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f9fafb;font-family:sans-serif;color:#111827;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;">
        <tr><td style="padding:32px;">
          <h2 style="font-size:20px;font-weight:700;margin:0 0 24px;color:#7C3AED;">✦ New Premium Order</h2>
          <table width="100%" cellpadding="10" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;">
            <tr style="background:#f3f4f6;"><td style="font-weight:600;color:#6B7280;font-size:13px;width:40%;">Name</td><td style="font-weight:700;">${name}</td></tr>
            <tr><td style="font-weight:600;color:#6B7280;font-size:13px;border-top:1px solid #e5e7eb;">Email</td><td style="border-top:1px solid #e5e7eb;">${email}</td></tr>
            <tr style="background:#f3f4f6;"><td style="font-weight:600;color:#6B7280;font-size:13px;border-top:1px solid #e5e7eb;">Birth Date</td><td style="border-top:1px solid #e5e7eb;">${birthDate}</td></tr>
            <tr><td style="font-weight:600;color:#6B7280;font-size:13px;border-top:1px solid #e5e7eb;">Birth Time</td><td style="border-top:1px solid #e5e7eb;">${birthTime}</td></tr>
            <tr style="background:#f3f4f6;"><td style="font-weight:600;color:#6B7280;font-size:13px;border-top:1px solid #e5e7eb;">Gender</td><td style="border-top:1px solid #e5e7eb;">${gender}</td></tr>
            <tr><td style="font-weight:600;color:#6B7280;font-size:13px;border-top:1px solid #e5e7eb;">Order ID</td><td style="border-top:1px solid #e5e7eb;font-size:12px;color:#9CA3AF;">${orderId}</td></tr>
            <tr style="background:#f3f4f6;"><td style="font-weight:600;color:#6B7280;font-size:13px;border-top:1px solid #e5e7eb;">Payment Key</td><td style="border-top:1px solid #e5e7eb;font-size:12px;color:#9CA3AF;">${paymentKey}</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
