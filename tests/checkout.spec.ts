import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('Complete purchase flow from catalog to success', async ({ page }) => {
    // 1. Start at Catalog
    await page.goto('/products');
    
    // Ensure catalog loaded
    await expect(page.locator('h1', { hasText: 'The Catalog' })).toBeVisible();

    // 2. Click the first product
    // Assuming the product card has a link wrapping the image or title
    const firstProduct = page.locator('.glass-card').first();
    await firstProduct.locator('a').first().click();

    // 3. Wait for Product Detail page
    await expect(page.locator('button', { hasText: 'Add to Cart' })).toBeVisible();

    // 4. Add to cart
    await page.locator('button', { hasText: 'Add to Cart' }).click();

    // Check toast notification
    await expect(page.locator('text=Added to cart')).toBeVisible();

    // 5. Open Cart Drawer
    await page.locator('header').locator('button').filter({ has: page.locator('.lucide-shopping-cart') }).first().click();

    // 6. Verify cart contents and proceed to checkout
    await expect(page.locator('h2', { hasText: 'Your Cart' })).toBeVisible();
    await page.locator('button', { hasText: 'Checkout' }).click();

    // 7. Fill Address Step
    await expect(page.locator('h2', { hasText: 'Shipping Address' })).toBeVisible();
    await page.locator('button', { hasText: 'Continue to Shipping' }).click();

    // 8. Shipping Step
    await expect(page.locator('h2', { hasText: 'Shipping Method' })).toBeVisible();
    await page.locator('button', { hasText: 'Continue to Payment' }).click();

    // 9. Payment Step
    await expect(page.locator('h2', { hasText: 'Ready to Pay' })).toBeVisible();
    
    // Click Pay Now
    await page.locator('button', { hasText: 'PAY NOW' }).click();

    // 10. Success Page
    // Since handlePay has a 1.5s timeout to simulate success, we wait for it
    await expect(page.locator('h1', { hasText: 'Order Complete!' })).toBeVisible({ timeout: 5000 });
  });
});
