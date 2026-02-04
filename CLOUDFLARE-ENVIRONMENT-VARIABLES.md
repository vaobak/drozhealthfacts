# 🔧 Cloudflare Pages Environment Variables

## Required Environment Variables

Set these in your Cloudflare Pages dashboard:

### Production Environment Variables:
```
REACT_APP_API_ENDPOINT = https://drozhealthfacts.com/api
REACT_APP_API_KEY = droz-health-facts-api-key-2026
REACT_APP_PROJECT_ID = droz-health-facts
REACT_APP_ENABLE_CLOUD_SYNC = true
REACT_APP_FALLBACK_TO_LOCAL = false
REACT_APP_DB_PROVIDER = d1
```

### Preview Environment Variables (same as production):
```
REACT_APP_API_ENDPOINT = https://drozhealthfacts.com/api
REACT_APP_API_KEY = droz-health-facts-api-key-2026
REACT_APP_PROJECT_ID = droz-health-facts
REACT_APP_ENABLE_CLOUD_SYNC = true
REACT_APP_FALLBACK_TO_LOCAL = false
REACT_APP_DB_PROVIDER = d1
```

## How to Set in Cloudflare Pages:

1. Go to your Cloudflare Pages dashboard
2. Select your project (drozhealthfacts)
3. Go to Settings → Environment Variables
4. Add each variable above for both Production and Preview
5. Click "Save"

## What Each Variable Does:

- `REACT_APP_API_ENDPOINT`: Base URL for your API endpoints
- `REACT_APP_API_KEY`: Authentication key for API requests
- `REACT_APP_PROJECT_ID`: Project identifier for security
- `REACT_APP_ENABLE_CLOUD_SYNC`: Enables cloud database (set to true)
- `REACT_APP_FALLBACK_TO_LOCAL`: Disables localStorage fallback (set to false)
- `REACT_APP_DB_PROVIDER`: Specifies D1 as database provider

## After Setting Variables:
1. Redeploy your site (or it will auto-deploy)
2. Test the affiliate system at: https://drozhealthfacts.com/affiliate
3. Password: @DRsuperZ6