---
name: facebook-playwright
description: Facebook automation with Playwright. Use when automating Facebook login, posting, checking comments, or replying to comments via browser automation.
---

# Facebook Playwright Automation

## Quick Start

Run the bundled script:
```bash
cd /home/tuananh/.openclaw/workspace/skills/public/facebook-playwright/scripts
FB_EMAIL="your@email.com" FB_PASS="yourpassword" FB_POST_TEXT="Hello" node fb_automation.ts
```

## Workflow
1. Login with email/password (manual 2FA approval if enabled)
2. Post status if `FB_POST_TEXT` is set
3. Visit profile and reply to first comment

## Files
- `scripts/fb_automation.ts` → main Playwright automation
- `references/README.md` → environment variables and notes

## Notes
- Facebook UI changes frequently; selectors may need updates.
- Always test with small posts before running automation.
