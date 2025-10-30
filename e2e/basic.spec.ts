import { test, expect } from "@playwright/test";

test.describe("SortisIQ Marketing Site", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");

    // Check for hero headline
    await expect(page.getByRole("heading", { name: /Smarter Leads/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Stronger Books/i })).toBeVisible();

    // Check navigation
    await expect(page.getByRole("link", { name: "Platform" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Proof" })).toBeVisible();
  });

  test("navigation works", async ({ page }) => {
    await page.goto("/");

    // Click Platform link
    await page.getByRole("link", { name: "Platform", exact: true }).click();
    await expect(page).toHaveURL("/platform");
    await expect(page.getByRole("heading", { name: /The Platform That/i })).toBeVisible();

    // Click Proof link
    await page.getByRole("link", { name: "Proof" }).click();
    await expect(page).toHaveURL("/proof");
    await expect(page.getByRole("heading", { name: /Results That/i })).toBeVisible();
  });

  test("lead form submission", async ({ page }) => {
    await page.goto("/start");

    // Fill out form
    await page.fill('input[type="text"]', "John Doe");
    await page.fill('input[type="email"]', "john@example.com");
    await page.fill('input[name="company"], #company', "Test Company");

    // Submit form
    await page.getByRole("button", { name: /Book Demo/i }).click();

    // Check for success message (dev mode should succeed)
    await expect(page.getByText(/Thanks!/i)).toBeVisible({ timeout: 10000 });
  });

  test("sticky navbar on scroll", async ({ page }) => {
    await page.goto("/");

    const nav = page.locator("nav");

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));

    // Check if nav has glass effect class
    await expect(nav).toHaveClass(/glass/);
  });
});
