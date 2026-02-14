# Facebook Automation (Playwright)

This skill bundles a minimal Playwright automation script to:
- Login to Facebook
- Create a post
- Check and reply to comments

## Environment Variables
- `FB_EMAIL`: Facebook login email
- `FB_PASS`: Facebook login password
- `FB_POST_TEXT`: (optional) Post content
- `FB_REPLY_TEXT`: (optional) Reply to comments

## Notes
- 2FA login approval must be completed manually.
- Use headless=false for debugging.
- Adjust selectors depending on UI changes.
