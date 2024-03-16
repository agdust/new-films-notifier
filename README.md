# New Films Notifier

## Description

Simple bot that crawles cinema site, and sends notifications about new films to all subscribed telegram users.

This bot is intentionally made non-24/7 running, and doesn't use any telegram frmaeworks, in the sake of lean development. Instead it runs just for few minutes on schedule via cron

1. Adding new users happens twice per day (because telegram only stores updates for 24 hours)
2. Crawling and notificating happens once per day, in evening time

I wrote this crawler and bot for myself, that's why there is no preferences at all, parsing happens only for my home city. If this bot will be useful for anyone in else, I'll then add more configuration and flexibility

## Some development info

It's written on JS and node because I know them, even though JS might be not the best cron scriping language.

I this project I tried super strict eslint config, and most rules are really great and useful

To run this project via cron, one have to manually define PATH variable in crontab. Tested on latest lts node — 20
