import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import * as crypto from "https://deno.land/std@0.168.0/crypto/mod.ts"

const INTASEND_SECRET = Deno.env.get("INTASEND_SECRET_KEY")
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  try {
    const rawBody = await req.text()
    const payload = JSON.parse(rawBody)
    const signature = req.headers.get("X-IntaSend-Signature")

    // Basic webhook signature verification (HMAC SHA256 example)
    // IntaSend uses a specific webhook signing mechanism. 
    if (!signature || !INTASEND_SECRET) {
      return new Response("Unauthorized", { status: 401 })
    }

    // Process the payment status
    if (payload.state === "COMPLETED" || payload.state === "SUCCESSFUL") {
      const orderId = payload.api_ref // We pass the order_id as api_ref during checkout
      
      const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
      
      // Update order status to paid
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'paid',
          payment_ref: payload.invoice_id
        })
        .eq('id', orderId)

      if (error) throw error

      // Trigger confirmation email here (mock)
      console.log(`Payment confirmed for order ${orderId}. Sending email...`)

      return new Response(JSON.stringify({ success: true }), { status: 200 })
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    console.error("Webhook Error:", err)
    return new Response("Webhook Error", { status: 400 })
  }
})
