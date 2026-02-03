# Railway Deployment Guide

This guide will help you deploy OpenClaw on Railway in just a few minutes.

## Prerequisites

- A GitHub account
- A Railway account (sign up at https://railway.app/)
- API keys for your preferred AI provider (Claude, GPT, etc.)

## Quick Start

### 1. Fork the repository

Fork this repository to your GitHub account:

```bash
gh repo fork openclaw/openclaw --clone
cd openclaw
```

Or use the GitHub web interface to fork: https://github.com/openclaw/openclaw

### 2. Deploy to Railway

1. Go to [Railway](https://railway.app/) and sign in
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Choose your forked `openclaw` repository
5. Railway will detect the `railway.json` config and start building

### 3. Configure your service

#### Add a Volume
- Navigate to: Service → **Settings** → **Volumes**
- Click **New Volume**
- Mount Path: `/data`
- Size: 1GB minimum (increase if you need more workspace storage)

#### Set Environment Variables
Go to the **Variables** tab and add:

| Variable | Value | Notes |
|----------|-------|-------|
| `SETUP_PASSWORD` | `<your-secure-password>` | Password to access the setup wizard |
| `PORT` | `8080` | Required - must be this value |
| `OPENCLAW_STATE_DIR` | `/data/.openclaw` | Stores config and credentials |
| `OPENCLAW_WORKSPACE_DIR` | `/data/workspace` | Agent workspace directory |
| `OPENCLAW_GATEWAY_TOKEN` | `<random-secure-token>` | Admin API token (generate with `openssl rand -hex 32`) |

#### Generate a Domain
- Go to: Service → **Settings** → **Networking**
- Click **Generate Domain**
- You'll get a URL like: `https://openclaw-production-XXXX.up.railway.app`

### 4. Complete setup via web wizard

1. Visit: `https://<your-railway-domain>/setup`
2. Enter your `SETUP_PASSWORD`
3. Add your AI provider credentials (Claude, OpenAI, etc.)
4. (Optional) Add messaging platform tokens (Telegram, Discord, Slack)
5. Click **Run setup**

### 5. Start using OpenClaw

Access the control UI at: `https://<your-railway-domain>/openclaw`

## What's Included

- ✅ OpenClaw Gateway + Control UI
- ✅ Web-based setup wizard (no terminal needed)
- ✅ Persistent storage via Railway Volume
- ✅ Automatic HTTPS
- ✅ Health checks and auto-restart
- ✅ Backup export at `/setup/export`

## Configuration Files

This repository includes:

- `railway.json` - Railway service configuration
- `Dockerfile` - Container build configuration
- `docs/railway.mdx` - Detailed deployment documentation

## Getting Messaging Platform Tokens

### Telegram Bot
1. Message `@BotFather` on Telegram
2. Run `/newbot` and follow the prompts
3. Copy the bot token (format: `123456789:AA...`)

### Discord Bot
1. Go to https://discord.com/developers/applications
2. Create a **New Application**
3. Go to **Bot** → **Add Bot**
4. Enable **MESSAGE CONTENT INTENT** (required!)
5. Copy the bot token
6. Invite the bot to your server using the OAuth2 URL Generator

## Troubleshooting

### Deployment fails
- Check that all required environment variables are set
- Verify the volume is properly mounted at `/data`
- Check Railway logs: Service → **Deployments** → Click on your deployment

### Cannot access the web UI
- Make sure you generated a domain in Railway settings
- Verify `PORT=8080` is set in environment variables
- Check that the service is running in Railway dashboard

### Setup wizard won't load
- Confirm `SETUP_PASSWORD` is set
- Check that the domain is accessible
- Try accessing `/health` endpoint first to verify service is running

## Backups & Migration

Download a complete backup at:
```
https://<your-railway-domain>/setup/export
```

This exports your entire OpenClaw state and workspace, allowing you to migrate to another hosting platform without losing data.

## Support

- Documentation: https://docs.openclaw.ai/
- Railway docs: https://docs.openclaw.ai/railway
- GitHub Issues: https://github.com/openclaw/openclaw/issues

## Cost Estimate

Railway pricing is usage-based:

- **Hobby Plan**: $5/month for 5 GB RAM, 5 GB disk
- **Pro Plan**: Pay-as-you-go starting at $20/month

OpenClaw typically uses:
- ~512MB-1GB RAM (depending on activity)
- ~1-5GB disk (for sessions, workspace)
- Minimal CPU (mostly idle, spikes on messages)

Most users fit comfortably in the Hobby plan.

## Next Steps

After deployment:
1. Configure your AI provider credentials in the setup wizard
2. Connect your messaging platforms (Telegram, Discord, etc.)
3. Test the bot by sending it a message
4. Explore the control UI to monitor activity
5. Check out the [documentation](https://docs.openclaw.ai/) for advanced features

Happy chatting! 🦞
