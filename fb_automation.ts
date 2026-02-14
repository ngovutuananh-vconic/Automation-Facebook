import { chromium, Page } from "playwright";

/**
 * Minimal Playwright automation for Facebook:
 * - login
 * - create post
 * - check recent comments and reply
 *
 * NOTE:
 * - Requires manual 2FA approval if enabled.
 * - Use ENV for credentials.
 */

const FB_EMAIL = process.env.FB_EMAIL || "";
const FB_PASS = process.env.FB_PASS || "";
const FB_POST_TEXT = process.env.FB_POST_TEXT || "";
const FB_REPLY_TEXT = process.env.FB_REPLY_TEXT || "Thanks for your comment!";

const FB_BASE = "https://www.facebook.com";

async function login(page: Page) {
  await page.goto(`${FB_BASE}/login`, { waitUntil: "domcontentloaded" });
  await page.fill("input[name='email']", FB_EMAIL);
  await page.fill("input[name='pass']", FB_PASS);
  await page.click("button[name='login']");

  // If 2FA is enabled, user must approve manually.
  // Wait up to 90s for login.
  await page.waitForURL(`${FB_BASE}/`, { timeout: 90000 });
}

async function createPost(page: Page) {
  await page.goto(`${FB_BASE}/`, { waitUntil: "domcontentloaded" });

  // Click "What's on your mind" box
  await page.click("div[role='button'][aria-label*='Bạn đang nghĩ gì']");
  const composer = page.locator("div[role='textbox']").first();
  await composer.fill(FB_POST_TEXT);

  // Click Post
  await page.click("div[role='button'][aria-label='Đăng']");
  await page.waitForTimeout(5000);
}

async function checkAndReplyComment(page: Page) {
  // Go to profile or page posts
  await page.goto(`${FB_BASE}/me`, { waitUntil: "domcontentloaded" });

  // Click first post
  const firstPost = page.locator("div[role='article']").first();
  await firstPost.click();

  // Wait for comments to load
  await page.waitForTimeout(2000);

  // Reply to first comment
  const replyBox = page.locator("div[role='textbox']").first();
  await replyBox.fill(FB_REPLY_TEXT);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
}

async function main() {
  if (!FB_EMAIL || !FB_PASS) {
    throw new Error("Missing FB_EMAIL or FB_PASS env vars");
  }

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await login(page);

  if (FB_POST_TEXT) {
    await createPost(page);
  }

  await checkAndReplyComment(page);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
