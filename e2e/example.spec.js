// @ts-check
import { test, expect } from '@playwright/test';

test.describe(`user rides`, async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('button', { name: 'Choose Roba Swings' }),
    ).toBeVisible();
  });

  test('user should be able to ride', async ({ page }) => {
    await page.getByRole('button', { name: 'Choose Roba Swings' }).click({
      force: true,
    });
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    await page.getByLabel('Amount of people').selectOption('2');
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page).toHaveURL(/.*#success$/);
  });

  test('user above height should not be allowed', async ({ page }) => {
    const rideLink = page.getByRole('button', {
      name: 'Choose Robo Coaster Of Doom',
    });
    await expect(rideLink).toBeVisible();
    await rideLink.click({ force: true });
    await expect(page.getByLabel('Amount of people')).toBeVisible();
    await page.getByLabel('Amount of people').selectOption('1');
    const heightInput = page.locator('input[id^="heightInput-"]').first();
    await expect(heightInput).toBeVisible();
    await heightInput.click();
    await heightInput.fill('139');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(
      page.getByText('Person 1 is too short for this ride'),
    ).toBeVisible();
  });

  test('user with minimum height should be allowed', async ({ page }) => {
    const rideLink = page.getByRole('button', {
      name: 'Choose Robo Coaster Of Doom',
    });
    await expect(rideLink).toBeVisible();
    await rideLink.click({ force: true });
    await expect(page.getByLabel('Amount of people')).toBeVisible();
    await page.getByLabel('Amount of people').selectOption('1');
    const heightInput = page.locator('input[id^="heightInput-"]').first();
    await expect(heightInput).toBeVisible();
    await heightInput.click();
    await heightInput.fill('141');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('1 person (>= 141 cm) for the')).toBeVisible();
  });
});
