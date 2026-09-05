// e2e/auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = 'e2e/auth/admin.json';

setup('auth user', async ({ page }) => {
  await page.goto('/admin');

  await expect(page.getByTestId('username')).toBeVisible();
  await page.getByTestId('username').fill('johnd');
  await page.getByTestId('password').fill('m38rmF$');

  await expect(page.getByTestId('submit-button')).toBeEnabled();
  await page.getByTestId('submit-button').click();

  await expect(page).toHaveURL('/admin/dashboard/products');

  await page.context().storageState({ path: authFile });
});
