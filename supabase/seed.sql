-- Seed data for Omni Hardware Store
-- Run after migrations

-- 1. ROLES
INSERT INTO roles (name, description) VALUES
  ('Super Admin', 'Full system access'),
  ('Admin', 'Administrative access'),
  ('Inventory Manager', 'Manages stock levels and purchase orders'),
  ('Order Manager', 'Processes and fulfills orders'),
  ('Content Editor', 'Manages product content and categories'),
  ('Support', 'Customer support access');

-- 2. PERMISSIONS
INSERT INTO permissions (action, resource) VALUES
  ('create', 'products'), ('read', 'products'), ('update', 'products'), ('delete', 'products'),
  ('create', 'orders'), ('read', 'orders'), ('update', 'orders'),
  ('create', 'inventory'), ('read', 'inventory'), ('update', 'inventory'),
  ('read', 'analytics'), ('manage', 'settings'), ('manage', 'staff');

-- 3. CATEGORIES (Hardware Store)
INSERT INTO categories (name, slug, description) VALUES
  ('Power Tools', 'power-tools', 'Drills, saws, grinders, and sanders'),
  ('Hand Tools', 'hand-tools', 'Hammers, wrenches, screwdrivers, and pliers'),
  ('Paint & Supplies', 'paint-supplies', 'Interior and exterior paint, brushes, rollers, and drop cloths'),
  ('Plumbing', 'plumbing', 'Pipes, fittings, faucets, and repair kits'),
  ('Electrical', 'electrical', 'Wiring, outlets, switches, and circuit breakers'),
  ('Fasteners', 'fasteners', 'Screws, nails, bolts, and anchors'),
  ('Safety Gear', 'safety-gear', 'Gloves, goggles, hard hats, and ear protection'),
  ('Building Materials', 'building-materials', 'Lumber, drywall, insulation, and concrete');

-- 4. BRANDS
INSERT INTO brands (name, slug, logo_url) VALUES
  ('DeWalt', 'dewalt', NULL),
  ('Milwaukee', 'milwaukee', NULL),
  ('Makita', 'makita', NULL),
  ('Stanley', 'stanley', NULL),
  ('Bosch', 'bosch', NULL),
  ('Rust-Oleum', 'rust-oleum', NULL),
  ('SharkBite', 'sharkbite', NULL),
  ('Simpson Strong-Tie', 'simpson-strong-tie', NULL);

-- 5. PRODUCTS
INSERT INTO products (name, slug, description, status, category_id, brand_id)
SELECT 'Cordless Drill/Driver Kit 20V MAX', 'cordless-drill-20v', 
  'Professional 20V MAX lithium-ion cordless drill/driver. Two-speed transmission for fastening and drilling. Includes 2 batteries, charger, and bag.',
  'published', c.id, b.id
FROM categories c, brands b WHERE c.slug = 'power-tools' AND b.slug = 'dewalt';

INSERT INTO products (name, slug, description, status, category_id, brand_id)
SELECT 'Professional Hammer & Wrench Set (16pc)', 'hammer-wrench-set-16pc',
  'Complete 16-piece set including 20oz claw hammer, 6 combination wrenches, needle-nose pliers, adjustable wrench, and more. Chrome vanadium steel.',
  'published', c.id, b.id
FROM categories c, brands b WHERE c.slug = 'hand-tools' AND b.slug = 'stanley';

INSERT INTO products (name, slug, description, status, category_id, brand_id)
SELECT 'Premium Interior Paint - Matte Finish (1 Gal)', 'premium-interior-paint',
  'Ultra-premium interior latex paint with excellent coverage and hide. Zero VOC, low odor formula. Washable matte finish.',
  'published', c.id, b.id
FROM categories c, brands b WHERE c.slug = 'paint-supplies' AND b.slug = 'rust-oleum';

INSERT INTO products (name, slug, description, status, category_id, brand_id)
SELECT 'Heavy Duty Circular Saw 7-1/4"', 'circular-saw-7',
  '15 Amp, 7-1/4-inch circular saw with 5800 RPM motor. Magnesium shoe for durability and reduced weight. 56-degree bevel capacity.',
  'published', c.id, b.id
FROM categories c, brands b WHERE c.slug = 'power-tools' AND b.slug = 'makita';

INSERT INTO products (name, slug, description, status, category_id, brand_id)
SELECT '100-Piece Screwdriver & Bit Set', 'screwdriver-bit-set-100',
  'Comprehensive 100-piece set with magnetic screwdrivers, precision bits, hex keys, and nut drivers. Chrome vanadium construction.',
  'published', c.id, b.id
FROM categories c, brands b WHERE c.slug = 'hand-tools' AND b.slug = 'stanley';

INSERT INTO products (name, slug, description, status, category_id, brand_id)
SELECT '1/2" PEX Pipe Cutter & Fittings Kit', 'pex-pipe-cutter-kit',
  'Push-to-connect PEX fitting kit with pipe cutter. Includes elbows, tees, couplings, and transition fittings. No special tools required.',
  'published', c.id, b.id
FROM categories c, brands b WHERE c.slug = 'plumbing' AND b.slug = 'sharkbite';

INSERT INTO products (name, slug, description, status, category_id, brand_id)
SELECT 'Exterior Weather Shield Paint (5 Gal)', 'exterior-weather-shield-5gal',
  'Advanced exterior paint with built-in primer. UV and weather resistant. Excellent adhesion on wood, brick, stucco, and vinyl siding.',
  'published', c.id, b.id
FROM categories c, brands b WHERE c.slug = 'paint-supplies' AND b.slug = 'rust-oleum';

INSERT INTO products (name, slug, description, status, category_id, brand_id)
SELECT '18-Gauge Brad Nailer (Pneumatic)', 'brad-nailer-18gauge',
  'Pneumatic 18-gauge brad nailer for trim, molding, and light carpentry. Adjustable depth of drive. Fires 5/8" to 2" brad nails.',
  'published', c.id, b.id
FROM categories c, brands b WHERE c.slug = 'power-tools' AND b.slug = 'dewalt';

-- 6. PRODUCT VARIANTS
INSERT INTO product_variants (product_id, sku, price, compare_at_price, name)
SELECT p.id, 'DW-DRILL-STD', 12900, NULL, 'Standard Kit'
FROM products p WHERE p.slug = 'cordless-drill-20v';

INSERT INTO product_variants (product_id, sku, price, compare_at_price, name)
SELECT p.id, 'DW-DRILL-PRO', 19900, NULL, 'Pro Kit (w/ Impact Driver)'
FROM products p WHERE p.slug = 'cordless-drill-20v';

INSERT INTO product_variants (product_id, sku, price, compare_at_price, name)
SELECT p.id, 'ST-HAMWRN-16', 8900, NULL, 'Standard'
FROM products p WHERE p.slug = 'hammer-wrench-set-16pc';

INSERT INTO product_variants (product_id, sku, price, compare_at_price, name)
SELECT p.id, 'RO-PAINT-INT-1G', 4500, 5900, 'Warm White'
FROM products p WHERE p.slug = 'premium-interior-paint';

INSERT INTO product_variants (product_id, sku, price, compare_at_price, name)
SELECT p.id, 'RO-PAINT-INT-1G-GRY', 4500, 5900, 'Slate Gray'
FROM products p WHERE p.slug = 'premium-interior-paint';

INSERT INTO product_variants (product_id, sku, price, compare_at_price, name)
SELECT p.id, 'MK-CSAW-7', 15900, NULL, 'Standard'
FROM products p WHERE p.slug = 'circular-saw-7';

INSERT INTO product_variants (product_id, sku, price, compare_at_price, name)
SELECT p.id, 'ST-SCRW-100', 3400, 4500, 'Standard'
FROM products p WHERE p.slug = 'screwdriver-bit-set-100';

INSERT INTO product_variants (product_id, sku, price, compare_at_price, name)
SELECT p.id, 'SB-PEX-KIT', 2900, NULL, 'Standard'
FROM products p WHERE p.slug = 'pex-pipe-cutter-kit';

INSERT INTO product_variants (product_id, sku, price, compare_at_price, name)
SELECT p.id, 'RO-PAINT-EXT-5G', 18900, NULL, 'Pure White'
FROM products p WHERE p.slug = 'exterior-weather-shield-5gal';

INSERT INTO product_variants (product_id, sku, price, compare_at_price, name)
SELECT p.id, 'DW-NAILER-18G', 9900, NULL, 'Standard'
FROM products p WHERE p.slug = 'brad-nailer-18gauge';

-- 7. LOCATIONS
INSERT INTO locations (name, address) VALUES
  ('Main Warehouse', '1200 Industrial Blvd, Nairobi, Kenya'),
  ('Downtown Store', '450 Kenyatta Avenue, Nairobi, Kenya');

-- 8. STOCK LEVELS (all at main warehouse)
INSERT INTO stock_levels (variant_id, location_id, on_hand, reserved, low_stock_threshold)
SELECT pv.id, l.id, 
  CASE 
    WHEN pv.sku = 'DW-DRILL-STD' THEN 30
    WHEN pv.sku = 'DW-DRILL-PRO' THEN 15
    WHEN pv.sku = 'ST-HAMWRN-16' THEN 120
    WHEN pv.sku LIKE 'RO-PAINT-INT%' THEN 100
    WHEN pv.sku = 'MK-CSAW-7' THEN 18
    WHEN pv.sku = 'ST-SCRW-100' THEN 85
    WHEN pv.sku = 'SB-PEX-KIT' THEN 0
    WHEN pv.sku = 'RO-PAINT-EXT-5G' THEN 32
    WHEN pv.sku = 'DW-NAILER-18G' THEN 22
    ELSE 50
  END, 0, 5
FROM product_variants pv, locations l WHERE l.name = 'Main Warehouse';

-- 9. SHIPPING ZONES
INSERT INTO shipping_zones (name, countries) VALUES
  ('Kenya', '["KE"]'::jsonb),
  ('East Africa', '["KE","UG","TZ","RW"]'::jsonb);

-- 10. SHIPPING RATES
INSERT INTO shipping_rates (zone_id, name, price, min_order_value) 
SELECT sz.id, 'Standard Delivery (3-5 days)', 500, NULL
FROM shipping_zones sz WHERE sz.name = 'Kenya';

INSERT INTO shipping_rates (zone_id, name, price, min_order_value) 
SELECT sz.id, 'Free Delivery', 0, 15000
FROM shipping_zones sz WHERE sz.name = 'Kenya';

INSERT INTO shipping_rates (zone_id, name, price, min_order_value) 
SELECT sz.id, 'Express Delivery (1-2 days)', 1500, NULL
FROM shipping_zones sz WHERE sz.name = 'Kenya';

-- 11. SETTINGS
INSERT INTO settings (key, value) VALUES
  ('store_name', '"Omni Hardware"'::jsonb),
  ('store_currency', '"KES"'::jsonb),
  ('store_timezone', '"Africa/Nairobi"'::jsonb),
  ('tax_rate', '16'::jsonb),
  ('low_stock_alert_enabled', 'true'::jsonb),
  ('low_stock_threshold_default', '5'::jsonb);
