import { expect, test } from '@playwright/test';
test('change language and check home link text with correct translation', async ({ page }) => {
  await page.goto('/');

  const languageSelect = page.getByTestId('language-switcher');
  const homeLink = page.getByTestId('home-link');
  await languageSelect.selectOption('ru');

  await expect(homeLink).toHaveText('Главная');

  await languageSelect.selectOption('en');

  await expect(homeLink).toHaveText('Home');
});

test('redirect to home page when click to logout', async ({ page }) => {
  await page.goto('/admin/dashboard/products');

  const logOut = page.getByTestId('logout');
  await logOut.click();

  await expect(page).toHaveURL('/');
});
