import { test, expect } from "@playwright/test";

// ─── Homepage ─────────────────────────────────────────────────────────────────

test.describe("Homepage", () => {
  test("loads and shows the navbar", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "TicketFlow" }).first(),
    ).toBeVisible();
  });

  test("search bar is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByPlaceholder("Search events...")).toBeVisible();
  });

  test("MyTickets link is visible in navbar", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "MyTickets" })).toBeVisible();
  });
});

// ─── Events Page ──────────────────────────────────────────────────────────────

test.describe("Events page", () => {
  test("navigates to /events and shows title", async ({ page }) => {
    await page.goto("/events");
    await expect(page.getByText("Explore All Events")).toBeVisible();
  });
});

// ─── Admin - Categories Page ──────────────────────────────────────────────────

test.describe("Admin categories page", () => {
  test("shows Manage Categories heading", async ({ page }) => {
    await page.goto("/admin/categories");
    await expect(page.getByText("Manage Categories")).toBeVisible();
  });

  test("Add Category button is present", async ({ page }) => {
    await page.goto("/admin/categories");
    await expect(
      page.getByRole("button", { name: /Add Category/i }),
    ).toBeVisible();
  });
});

// ─── Admin - Events Page ───────────────────────────────────────────────────────

test.describe("Admin events page", () => {
  test("shows Manage Events heading", async ({ page }) => {
    await page.goto("/admin/events");
    await expect(page.getByText("Manage Events")).toBeVisible();
  });

  test("Create New Event button is present", async ({ page }) => {
    await page.goto("/admin/events");
    await expect(
      page.getByRole("button", { name: /Create New Event/i }),
    ).toBeVisible();
  });
});
