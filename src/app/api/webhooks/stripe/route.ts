// src/app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

// 確保使用 Node.js Runtime（Webhook 需要 raw body / Node 環境）
export const runtime = 'nodejs'

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !secret) {
    return NextResponse.json(
      { error: 'Missing stripe-signature or STRIPE_WEBHOOK_SECRET' },
      { status: 400 }
    )
  }

  // 讀 raw body（string 即可；Stripe 會接受 string 或 Buffer）
  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('❌ Webhook signature verification failed:', message)
    return new NextResponse('Bad signature', { status: 400 })
  }

  // 根據事件類型處理
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      // TODO: 在這裡寫入訂單到 DB、寄信、出貨通知等
      console.log('✅ Payment success. Session ID:', session.id)
      break
    }
    case 'payment_intent.succeeded': {
      const pi = event.data.object as Stripe.PaymentIntent
      console.log('✅ PaymentIntent succeeded:', pi.id)
      break
    }
    default: {
      // 其他事件先略過或加上需要的處理
      // console.log(`Unhandled event type: ${event.type}`)
      break
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}