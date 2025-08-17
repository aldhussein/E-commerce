import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("❌ Webhook signature failed:", err);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("✅ Checkout session completed:", session);

    const userId = session.metadata?.userId;

    if (!userId) {
      console.error("❌ No userId in session metadata");
      return new Response("No userId in metadata", { status: 400 });
    }

    try {
      await prisma.order.create({
        data: {
          amount: (session.amount_total ?? 0) / 100,
          status: "paid",
          userId,
        },
      });

      await redis.del(`cart-${userId}`);
      console.log(`🗑️ Deleted cart for user ${userId}`);
    } catch (err) {
      console.error("❌ Failed to create order or delete cart:", err);
    }
  } else {
    console.log("ℹ️ Unhandled event type:", event.type);
  }

  return new Response(null, { status: 200 });
}
