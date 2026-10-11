import { expect, test } from '@playwright/test';

test('open users admin page with the list of users', async ({ page }) => {
  const mockUsers = [
    {
      address: {
        geolocation: {
          lat: '-37.3159',
          long: '81.1496',
        },
        city: 'kilcoole',
        street: 'new road',
        number: 7682,
        zipcode: '12926-3874',
      },
      id: 1,
      email: 'john@gmail.com',
      username: 'johnd',
      name: {
        firstname: 'john',
        lastname: 'doe',
      },
      phone: '1-570-236-7033',
    },
  ];
  await page.route('https://fakestoreapi.com/users', route =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockUsers),
    })
  );

  await page.goto('/admin/dashboard/users');

  await expect(page.getByRole('heading')).toBeVisible();
});
