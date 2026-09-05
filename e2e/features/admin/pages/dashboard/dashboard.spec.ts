import { expect, test } from '@playwright/test';

test('open dashboard admin page with the list of products', async ({ page }) => {
  await page.goto('/admin/dashboard/products');
  await expect(page.getByRole('heading')).toBeVisible();
});
