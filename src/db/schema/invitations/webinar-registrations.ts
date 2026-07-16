import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";

export const webinarRegistrations = pgTable("webinar_registrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  city: text("city"),
  amount: integer("amount").notNull(), // in paise
  razorpayOrderId: text("razorpay_order_id").notNull(),
  razorpayPaymentId: text("razorpay_payment_id"),
  status: text("status").notNull().default("created"), // created | paid | failed
  zoomLinkSent: boolean("zoom_link_sent").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
