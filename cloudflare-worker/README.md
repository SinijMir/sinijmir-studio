# SinijMir Telegram Leads Worker

This Worker receives the existing website inquiry payload, validates it, and
sends the message to Telegram without exposing Telegram credentials to the
browser or repository.

Required encrypted secrets:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

The public Worker URL is intentionally not committed here. The website endpoint
must only be changed after OPTIONS, validation, honeypot, and real delivery
checks pass against the deployed Worker.
