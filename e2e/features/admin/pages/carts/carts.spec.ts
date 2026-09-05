import { expect, test } from '@playwright/test';

test('open carts admin page with the list of carts', async ({ page }) => {
  const mockCarts = [
    {
      id: 1,
      userId: 1,
      date: '2020-03-02T00:00:00.000Z',
      products: [
        {
          productId: 1,
          quantity: 4,
        },
        {
          productId: 2,
          quantity: 1,
        },
        {
          productId: 3,
          quantity: 6,
        },
      ],
    },
    {
      id: 2,
      userId: 1,
      date: '2020-01-02T00:00:00.000Z',
      products: [
        {
          productId: 2,
          quantity: 4,
        },
        {
          productId: 1,
          quantity: 10,
        },
        {
          productId: 5,
          quantity: 2,
        },
      ],
    },
  ];
  await page.route('https://fakestoreapi.com/carts', route =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockCarts),
    })
  );

  await page.goto('/admin/dashboard/carts');

  await expect(page.getByRole('heading')).toBeVisible();
});
