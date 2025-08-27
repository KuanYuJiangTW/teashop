# Teashop - Next.js E-commerce

A modern e-commerce platform built with Next.js, Prisma, and Stripe.

## Features

- 🛒 Shopping cart functionality
- 💳 Stripe payment integration
- 📦 Order management system
- 🎨 Modern UI with Tailwind CSS
- 🔐 Admin panel for order management

## Tech Stack

- **Framework**: Next.js 15
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Stripe
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
ADMIN_KEY="your-admin-secret-key"
```

## Vercel Deployment

### 1. Database Setup

1. Create a PostgreSQL database (recommended: Vercel Postgres or Neon)
2. Add the `DATABASE_URL` to your Vercel environment variables

### 2. Environment Variables in Vercel

Add these environment variables in your Vercel project settings:

- `DATABASE_URL` - Your PostgreSQL connection string
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `NEXT_PUBLIC_BASE_URL` - Your production URL (e.g., https://your-app.vercel.app)
- `ADMIN_KEY` - A secret key for admin authentication

### 3. Database Migration

After deploying, run the database migration:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma db push

# Or using Vercel's built-in migration
# The postinstall script will handle Prisma client generation
```

### 4. Stripe Webhook Configuration

1. Go to your Stripe Dashboard
2. Navigate to Webhooks
3. Add endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
4. Select events: `checkout.session.completed`
5. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

## Admin Panel

Access the admin panel at `/admin/orders` with the `ADMIN_KEY` header:

```bash
curl -H "Authorization: Bearer your-admin-key" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"status":"paid"}' \
  https://your-app.vercel.app/api/admin/orders/order-id/status
```

## License

MIT
