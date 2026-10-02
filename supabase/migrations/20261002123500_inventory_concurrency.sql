-- Phase 1B: Inventory Concurrency & Locking

-- Reserve stock safely using row-level locking
CREATE OR REPLACE FUNCTION reserve_stock(p_variant_id UUID, p_location_id UUID, p_quantity INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    v_available INTEGER;
BEGIN
    -- Lock the row for update to prevent concurrent race conditions
    SELECT (on_hand - reserved) INTO v_available
    FROM stock_levels
    WHERE variant_id = p_variant_id AND location_id = p_location_id
    FOR UPDATE;

    IF v_available >= p_quantity THEN
        UPDATE stock_levels
        SET reserved = reserved + p_quantity,
            updated_at = NOW()
        WHERE variant_id = p_variant_id AND location_id = p_location_id;
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Confirm stock sale (moves from reserved to completely removed, and logs movement)
CREATE OR REPLACE FUNCTION confirm_stock_sale(p_variant_id UUID, p_location_id UUID, p_quantity INTEGER, p_reference_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE stock_levels
    SET on_hand = on_hand - p_quantity,
        reserved = reserved - p_quantity,
        updated_at = NOW()
    WHERE variant_id = p_variant_id AND location_id = p_location_id;

    INSERT INTO stock_movements (variant_id, location_id, quantity, reason, reference_id, note)
    VALUES (p_variant_id, p_location_id, -p_quantity, 'sale', p_reference_id, 'Order fulfilled');
END;
$$ LANGUAGE plpgsql;

-- Release reserved stock (e.g. cart expired)
CREATE OR REPLACE FUNCTION release_reserved_stock(p_variant_id UUID, p_location_id UUID, p_quantity INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE stock_levels
    SET reserved = reserved - p_quantity,
        updated_at = NOW()
    WHERE variant_id = p_variant_id AND location_id = p_location_id;
END;
$$ LANGUAGE plpgsql;
