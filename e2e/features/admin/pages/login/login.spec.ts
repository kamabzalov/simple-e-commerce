import { expect, test } from '@playwright/test';

test('success login', async ({ page }) => {
  await page.goto('/admin');

  await expect(page.getByTestId('username')).toBeVisible();
  await expect(page.getByTestId('password')).toBeVisible();

  await page.getByTestId('username').fill('johnd');
  await page.getByTestId('password').fill('m38rmF$');

  await expect(page.getByTestId('submit-button')).toBeEnabled();
  await page.getByTestId('submit-button').click();

  await expect(page).toHaveURL('/admin/dashboard/products');
});
