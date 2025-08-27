// src/lib/stripe.ts
import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe() {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");

  _stripe = new Stripe(key); // ⬅️ 移除 apiVersion
  return _stripe;
}