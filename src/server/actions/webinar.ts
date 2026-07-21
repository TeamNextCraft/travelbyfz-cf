import { createServerFn } from "@tanstack/react-start";
import Razorpay from "razorpay";
import crypto from "node:crypto";
import { getDb } from "#/db/client";
import { webinarRegistrations } from "#/db/schema/webinar-registrations";
import { eq } from "drizzle-orm";
// import { sendWebinarConfirmation } from "./notifications";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const WEBINAR_AMOUNT = 19900; // ₹199 in paise

export const createWebinarOrder = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { name: string; email: string; phone: string; city?: string }) =>
      data,
  )
  .handler(async ({ data }) => {

    const db = getDb();


    const order = await razorpay.orders.create({
      amount: WEBINAR_AMOUNT,
      currency: "INR",
      receipt: `webinar_${Date.now()}`,
      notes: { name: data.name, email: data.email, phone: data.phone },
    });

    try {
      await  db.insert(webinarRegistrations).values({
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city ?? null,
        amount: WEBINAR_AMOUNT,
        razorpayOrderId: order.id,
        status: "created",
      });

    } catch (error) {
      throw new Error("Failed to create webinar registration");
    }

    return {
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    };
  });

export const verifyWebinarPayment = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    const db = getDb();
    const body = `${data.razorpay_order_id}|${data.razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== data.razorpay_signature) {
      throw new Error("Invalid payment signature");
    }

    const [registration] = await db
      .update(webinarRegistrations)
      .set({ status: "paid", razorpayPaymentId: data.razorpay_payment_id })
      .where(eq(webinarRegistrations.razorpayOrderId, data.razorpay_order_id))
      .returning();

    if (registration) {
      // await sendWebinarConfirmation(registration);
    }

    return { success: true };
  });
