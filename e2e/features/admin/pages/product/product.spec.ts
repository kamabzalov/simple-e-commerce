import { test, expect } from '@playwright/test';

test('successfully create new product', async ({ page }) => {
  await page.goto('/admin/dashboard/products/add-product');

  const productTitle = page.getByTestId('productTitle');
  const productPrice = page.getByTestId('productPrice');
  const productDescription = page.getByTestId('productDescription');
  const submitButton = page.getByTestId('submit-button');

  await expect(productTitle).toBeVisible();
  await expect(productPrice).toBeVisible();
  await expect(productDescription).toBeVisible();

  await productTitle.fill('Iphone 18');
  await productPrice.fill('1500');
  await productDescription.fill('Description');

  await submitButton.click();
  await expect(page).toHaveURL('/admin/dashboard/products');
});
