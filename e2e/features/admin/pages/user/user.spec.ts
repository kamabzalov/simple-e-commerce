import { test, expect } from '@playwright/test';

test('successfully create new product', async ({ page }) => {
  await page.goto('/admin/dashboard/users/add-user');

  const username = page.getByTestId('username');
  const email = page.getByTestId('email');
  const firstName = page.getByTestId('firstName');
  const lastName = page.getByTestId('lastName');
  const phone = page.getByTestId('phone');
  const submitButton = page.getByTestId('submit-button');

  await expect(username).toBeVisible();
  await expect(email).toBeVisible();
  await expect(firstName).toBeVisible();
  await expect(lastName).toBeVisible();
  await expect(phone).toBeVisible();

  await username.fill('kamabzalov');
  await email.fill('mail@kamil-abzalov.com');
  await firstName.fill('Kamil');
  await lastName.fill('Abzalov');
  await phone.fill('112233');

  await submitButton.click();
  await expect(page).toHaveURL('/admin/dashboard/users');
});
