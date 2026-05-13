# Upshft Auth

Self-hosted authentication service powered by [SuperTokens](https://supertokens.com/). Shared across all Upshft apps.

## Status

✅ **Deployed** on Coolify at `http://102.211.205.157:3567`

Service UUID: `c11k336iklp77tpdqxogqh5f`

## Stack

- **SuperTokens Core** (Java, port 3567) — auth + session management
- **PostgreSQL 17** (Alpine) — persistent user/credential/session storage

## Configuration

| Setting | Value | Note |
|---------|-------|------|
| Refresh token | 100 days (default) | Auto-refreshed by frontend SDK |
| Access token | 1 hour (default) | Auto-refreshed by frontend SDK |
| Telemetry | Disabled | |

## Verifying

```bash
curl -H "api-key: <key>" http://102.211.205.157:3567/hello
# → "Hello"
```

## Connecting an App

In the consumer app's backend SDK:

```go
supertokens.Init(supertokens.TypeInput{
    Supertokens: &supertokens.ConnectionInfo{
        ConnectionURI: "http://102.211.205.157:3567",
        APIKey:        os.Getenv("SUPERTOKENS_API_KEY"),
    },
    AppInfo: supertokens.AppInfo{
        AppName:       "YourApp",
        APIDomain:     "https://api.your-app.com",
        WebsiteDomain: "https://your-app.com",
    },
    RecipeList: []supertokens.Recipe{
        thirdparty.Init(...),       // Google, Facebook
        emailpassword.Init(nil),    // Email/Password
        session.Init(nil),          // Session management
    },
})
```

## Deploying on Coolify

1. Create a new **Docker Compose** service
2. Point at this repo
3. Set environment variables in Coolify UI
4. Deploy

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SUPERTOKENS_API_KEY` | Yes | — | API key (20+ chars, alphanumeric + `=` `-`) |
| `POSTGRES_USER` | No | `supertokens` | PostgreSQL user |
| `POSTGRES_PASSWORD` | No | `supertokens` | PostgreSQL password |

### OAuth Providers

Create OAuth apps and configure client IDs/secrets in the consumer app's backend SDK:

| Provider | Redirect URI |
|----------|-------------|
| Google | `https://api.upshft.app/auth/callback/google` |
| Facebook | `https://api.upshft.app/auth/callback/facebook` |

All apps share the same SuperTokens Core instance by using the same connection URI and API key.
