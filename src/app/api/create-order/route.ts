import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";

const PAYMENT_URL =
  process.env.NEXT_PUBLIC_PAYMENT_URL ?? "https://payment.liveblog365.com";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? "";
const SECRET_KEY = process.env.PAYMENT_SECRET_KEY ?? "";

// AES key & IV are static — same values from gateway every time
const AES_KEY = Buffer.from("f655ba9d09a112d4968c63579db590b4", "hex");
const AES_IV = Buffer.from("98344c2eee86c3994890592585b49f80", "hex");

function solveChallenge(html: string): string | null {
  const m = html.match(/c=toNumbers\("([a-f0-9]+)"\)/);
  if (!m) return null;

  try {
    const encrypted = Buffer.from(m[1], "hex");
    const decipher = crypto.createDecipheriv("aes-128-cbc", AES_KEY, AES_IV);
    decipher.setAutoPadding(false);
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    const pad = decrypted[decrypted.length - 1];
    const unpadded =
      pad > 0 && pad <= 16
        ? decrypted.subarray(0, decrypted.length - pad)
        : decrypted;

    return unpadded.toString("hex");
  } catch {
    return null;
  }
}

async function getCookie(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    const html = await res.text();
    return solveChallenge(html);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  let amount = 99;
  let customerName = "Customer";
  let customerEmail = "customer@example.com";
  let customerPhone = "9999999999";

  try {
    const body = await req.json();
    if (body.amount) amount = Number(body.amount);
    if (body.customer_name) customerName = body.customer_name;
    if (body.customer_email) customerEmail = body.customer_email;
    if (body.customer_phone) customerPhone = body.customer_phone;
  } catch {
    // Ignore and use default parameters if body parsing fails
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://videoseller.netlify.app";
  const origin = req.headers.get("origin") || siteUrl;

  const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;
  const returnUrl = `${origin}/success?order_id=${orderId}&status=success&amount=${amount}`;
  const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;

  const gatewayUrl = `${PAYMENT_URL}/api/create_payment.php`;

  // Try real gateway — exactly like PHP code
  try {
    const cookie = await getCookie(gatewayUrl);
    if (cookie) {
      const payload = JSON.stringify({
        order_id: orderId,
        amount: amount,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        return_url: returnUrl,
        description: `Payment - ₹${amount}`,
      });

      const gatewayRes = await fetch(gatewayUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
          "X-Secret-Key": SECRET_KEY,
          Cookie: `__test=${cookie}`,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: payload,
      });

      if (gatewayRes.status === 201) {
        const data = await gatewayRes.json();
        if (data?.status === "success" && data?.checkout_url) {
          return NextResponse.json({
            success: true,
            payment_url: data.checkout_url,
            order_id: orderId,
            payment_id: data.payment_id ?? null,
          });
        } else {
          return NextResponse.json({
            success: false,
            error: data?.message || "Failed to generate checkout link from payment gateway.",
          });
        }
      } else {
        const errText = await gatewayRes.text();
        console.error("Gateway error response status:", gatewayRes.status, errText);
        return NextResponse.json({
          success: false,
          error: `Payment gateway responded with status ${gatewayRes.status}.`,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        error: "Failed to resolve security challenge with payment gateway. Please try again.",
      });
    }
  } catch (error) {
    console.error("Payment Gateway error:", error);
    return NextResponse.json({
      success: false,
      error: "Unable to connect to the payment gateway. Please try again later.",
    });
  }
}

