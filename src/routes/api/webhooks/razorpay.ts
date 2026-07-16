import { createFileRoute } from "@tanstack/react-router";
import crypto from "node:crypto";
import { db } from "#/db/index.ts";
import { webinarRegistrations } from "#/db/schema";
import { eq } from "drizzle-orm";
import { sendWebinarConfirmation } from "#/server/actions/notifications";

export const Route = createFileRoute("/api/webhooks/razorpay")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const rawBody = await request.text();
        const signature = request.headers.get("x-razorpay-signature") ?? "";

        const expected = crypto
          .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
          .update(rawBody)
          .digest("hex");

        if (expected !== signature) {
          return new Response("Invalid signature", { status: 400 });
        }

        const payload = JSON.parse(rawBody);

        if (payload.event === "payment.captured") {
          const orderId = payload.payload.payment.entity.order_id;
          const [reg] = await db
            .update(webinarRegistrations)
            .set({ status: "paid" })
            .where(eq(webinarRegistrations.razorpayOrderId, orderId))
            .returning();

          if (reg && !reg.zoomLinkSent) {
            await sendWebinarConfirmation(reg);
          }
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
