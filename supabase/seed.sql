-- SEED DATA for Phase 1A

-- 1. Roles
INSERT INTO roles (name, description) VALUES
('Super Admin', 'Full access to all system features and settings'),
('Admin', 'Access to most features, cannot manage super admins'),
('Inventory Manager', 'Can manage products, variants, and stock levels'),
('Order Manager', 'Can view and process orders and returns'),
('Content Editor', 'Can manage categories, brands, and page content'),
('Support', 'Read-only access to orders and customer data');

-- 2. Permissions (Examples)
INSERT INTO permissions (action, resource) VALUES
('manage', 'all'),
('read', 'orders'),
('write', 'orders'),
('read', 'products'),
('write', 'products'),
('read', 'inventory'),
('write', 'inventory');

-- 3. Map Roles to Permissions (Super Admin gets manage all)
DO $$
DECLARE
    super_admin_id UUID;
    manage_all_id UUID;
BEGIN
    SELECT id INTO super_admin_id FROM roles WHERE name = 'Super Admin';
    SELECT id INTO manage_all_id FROM permissions WHERE action = 'manage' AND resource = 'all';
    
    INSERT INTO role_permissions (role_id, permission_id) VALUES (super_admin_id, manage_all_id);
END $$;

-- 4. Sample Categories
INSERT INTO categories (id, name, slug, description) VALUES
('c0000000-0000-0000-0000-000000000001', 'Audio', 'audio', 'Headphones, speakers, and audio equipment'),
('c0000000-0000-0000-0000-000000000002', 'Laptops', 'laptops', 'High-performance laptops for work and gaming'),
('c0000000-0000-0000-0000-000000000003', 'Accessories', 'accessories', 'Cables, chargers, and peripherals');

-- 5. Sample Brands
INSERT INTO brands (id, name, slug) VALUES
('b0000000-0000-0000-0000-000000000001', 'Sony', 'sony'),
('b0000000-0000-0000-0000-000000000002', 'Apple', 'apple'),
('b0000000-0000-0000-0000-000000000003', 'Logitech', 'logitech');

-- 6. Sample Products
INSERT INTO products (id, category_id, brand_id, name, slug, description, status) VALUES
('p0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Sony WH-1000XM5 Noise Cancelling Headphones', 'sony-wh-1000xm5', 'Industry-leading noise cancellation with auto NC optimizer.', 'published'),
('p0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'MacBook Pro 16-inch (M3 Max)', 'macbook-pro-16-m3-max', 'The most advanced Mac ever built for professionals.', 'published'),
('p0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000003', 'Logitech MX Master 3S Wireless Mouse', 'logitech-mx-master-3s', 'An iconic mouse remastered for ultimate tactile feel and performance.', 'published');

-- 7. Sample Variants
INSERT INTO product_variants (id, product_id, sku, barcode, price, name) VALUES
('v0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', 'SONY-WH5-BLK', '4548736132912', 39800, 'Black'), -- $398.00
('v0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000001', 'SONY-WH5-SLV', '4548736132929', 39800, 'Silver'),
('v0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000002', 'MBP-16-M3M-1TB-SLV', '194253329188', 349900, 'Silver / 1TB'), -- $3499.00
('v0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000003', 'LOGI-MX3S-GRY', '097855172235', 9900, 'Pale Grey'); -- $99.00

-- 8. Sample Images (Mock URLs)
INSERT INTO product_images (product_id, variant_id, url, alt_text, is_primary) VALUES
('p0000000-0000-0000-0000-000000000001', 'v0000000-0000-0000-0000-000000000001', 'https://example.com/images/sony-wh1000xm5-black.jpg', 'Sony WH-1000XM5 in Black', TRUE),
('p0000000-0000-0000-0000-000000000001', 'v0000000-0000-0000-0000-000000000002', 'https://example.com/images/sony-wh1000xm5-silver.jpg', 'Sony WH-1000XM5 in Silver', FALSE),
('p0000000-0000-0000-0000-000000000002', 'v0000000-0000-0000-0000-000000000003', 'https://example.com/images/macbook-pro-16-silver.jpg', 'MacBook Pro 16-inch Silver Front View', TRUE),
('p0000000-0000-0000-0000-000000000003', 'v0000000-0000-0000-0000-000000000004', 'https://example.com/images/logitech-mx3s-grey.jpg', 'Logitech MX Master 3S Mouse', TRUE);

-- 9. Sample Locations & Stock
INSERT INTO locations (id, name, address) VALUES
('l0000000-0000-0000-0000-000000000001', 'Main Warehouse', '123 Commerce St, Seattle, WA 98101');

INSERT INTO stock_levels (variant_id, location_id, on_hand, reserved) VALUES
('v0000000-0000-0000-0000-000000000001', 'l0000000-0000-0000-0000-000000000001', 50, 2),
('v0000000-0000-0000-0000-000000000002', 'l0000000-0000-0000-0000-000000000001', 15, 0),
('v0000000-0000-0000-0000-000000000003', 'l0000000-0000-0000-0000-000000000001', 5, 1),
('v0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000001', 120, 5);

-- 10. Ledger setup
INSERT INTO stock_movements (variant_id, location_id, quantity, reason, note) VALUES
('v0000000-0000-0000-0000-000000000001', 'l0000000-0000-0000-0000-000000000001', 50, 'received', 'Initial stock setup'),
('v0000000-0000-0000-0000-000000000002', 'l0000000-0000-0000-0000-000000000001', 15, 'received', 'Initial stock setup'),
('v0000000-0000-0000-0000-000000000003', 'l0000000-0000-0000-0000-000000000001', 5, 'received', 'Initial stock setup'),
('v0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000001', 120, 'received', 'Initial stock setup');

-- 11. Super Admin User
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data) VALUES
('u0000000-0000-0000-0000-000000000001', 'admin@example.com', '$2a$10$wU0M/0g7.o0X4z0P6t5e5u0M/0g7.o0X4z0P6t5e5u0M/0g7.o0X', NOW(), '{"provider":"email","providers":["email"]}', '{}');

INSERT INTO profiles (id, role_id, first_name, last_name) VALUES
('u0000000-0000-0000-0000-000000000001', (SELECT id FROM roles WHERE name = 'Super Admin'), 'Super', 'Admin');
