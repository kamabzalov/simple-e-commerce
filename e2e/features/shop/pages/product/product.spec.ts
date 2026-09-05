import { expect, test } from '@playwright/test';

test('click by product name and open product page', async ({ page }) => {
  await page.goto('/products/1');

  const productHeading = page.getByTestId('productTitle');
  await expect(productHeading).toHaveText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
});
