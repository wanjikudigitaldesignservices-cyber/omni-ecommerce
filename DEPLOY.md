# Deployment Guide (Nexus E-Commerce Platform)

## 1. Prerequisites
Before deploying, ensure you have active accounts for:
- **Vercel** (Frontend Hosting)
- **Supabase** (Database & Auth)
- **IntaSend** (Payment Gateway)

## 2. Environment Variables
You must configure the following environment variables in your Vercel Project Settings:

### Vercel (Frontend)
```env
# Supabase
VITE_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]

# IntaSend
VITE_INTASEND_PUBLIC_KEY=[YOUR-INTASEND-PUBLIC-KEY]
```

### Supabase (Edge Functions)
For your Webhook to operate, you must set these inside your Supabase project (Settings -> Edge Functions -> Secrets):
```env
INTASEND_SECRET_KEY=[YOUR-INTASEND-SECRET-KEY]
```

## 3. Database Migration
Run the following commands using the Supabase CLI to push the schema (Tables + Inventory RPC + Create Order RPC):
```bash
supabase link --project-ref [YOUR-PROJECT-REF]
supabase db push
```

## 4. Deploying Edge Functions
Deploy the IntaSend webhook listener to Supabase so it can listen for payment confirmations:
```bash
supabase functions deploy intasend-webhook --no-verify-jwt
```
*Note: Make sure to set your Webhook URL inside your IntaSend Developer Dashboard to: `https://[YOUR-PROJECT-REF].supabase.co/functions/v1/intasend-webhook`*

## 5. Vercel Deployment Commands
Connect your GitHub repository to Vercel. Vercel will automatically detect Vite. 
Ensure the Build Settings are:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

The included `vercel.json` will automatically configure URL rewrites so the React Router works for sub-pages like `/products/:slug`.

## 6. Testing in Production
1. Open your live Vercel URL.
2. Complete a test purchase using IntaSend's sandbox/test mode.
3. Verify that the stock quantity for the item drops in your Supabase `order_items` and `products` table.
4. Verify the order `status` flips to `paid`.
