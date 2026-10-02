-- Migration: Create Order RPC and Orders tables if not fully defined

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, processing, shipped, delivered, cancelled
  subtotal INTEGER NOT NULL,
  discount_total INTEGER NOT NULL,
  shipping_total INTEGER NOT NULL,
  grand_total INTEGER NOT NULL,
  shipping_method TEXT,
  shipping_address JSONB,
  payment_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL,
  variant_id TEXT,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL
);

-- Note: We rely on the inventory functions created in Phase 1B (reserve_stock) 
-- to safely decrement stock. Here we create a wrapper RPC for order creation.

CREATE OR REPLACE FUNCTION create_order(
  p_customer_email TEXT,
  p_subtotal INTEGER,
  p_discount_total INTEGER,
  p_shipping_total INTEGER,
  p_grand_total INTEGER,
  p_shipping_method TEXT,
  p_shipping_address JSONB,
  p_items JSONB -- Array of { product_id, variant_id, quantity, unit_price }
) RETURNS UUID AS $$
DECLARE
  v_order_id UUID;
  v_item RECORD;
BEGIN
  -- Insert the order
  INSERT INTO orders (
    customer_email, subtotal, discount_total, shipping_total, 
    grand_total, shipping_method, shipping_address, status
  ) VALUES (
    p_customer_email, p_subtotal, p_discount_total, p_shipping_total,
    p_grand_total, p_shipping_method, p_shipping_address, 'pending'
  ) RETURNING id INTO v_order_id;

  -- Iterate through items and insert
  FOR v_item IN SELECT * FROM jsonb_to_recordset(p_items) AS x(product_id UUID, variant_id TEXT, quantity INTEGER, unit_price INTEGER)
  LOOP
    -- Insert order item
    INSERT INTO order_items (order_id, product_id, variant_id, quantity, unit_price)
    VALUES (v_order_id, v_item.product_id, v_item.variant_id, v_item.quantity, v_item.unit_price);
    
    -- Reserve stock (relies on inventory_concurrency.sql from Phase 1B)
    PERFORM reserve_stock(v_item.product_id, v_item.quantity);
  END LOOP;

  RETURN v_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
