
// src/lib/stripe.ts
import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  // 讓錯誤訊息更清楚；同時避免某些 bundler 在 build 階段吞掉 undefined 的問題
  throw new Error('Missing STRIPE_SECRET_KEY. Set it in Vercel → Project → Settings → Environment Variables.');
}

export const stripe = new Stripe(key, {
    apiVersion: "2025-07-30.basil",
});