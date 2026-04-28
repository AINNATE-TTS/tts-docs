#!/bin/bash
set -euf -o pipefail

PAGES_PROJECT_NAME=$1
ENV_CODE=$2

if [[ -z $CLOUDFLARE_API_TOKEN || -z  $CLOUDFLARE_ACCOUNT_ID || -z $CLOUDFLARE_ZONE_ID ]]; then
    echo "[ERROR] Missing required environment variables."
    echo "[ERROR] Missing env CLOUDFLARE_API_TOKEN|CLOUDFLARE_ACCOUNT_ID|CLOUDFLARE_ZONE_ID"
    exit 1
fi

if [[ $ENV_CODE == "dev" || $ENV_CODE == "stg" ]]; then
    echo "[SYS] Setup basic authentication for $ENV_CODE"
    mkdir -p functions
    cat <<'EOF' > functions/_middleware.js
export const onRequest = async (context) => {
    const { request, env } = context;
    const auth = request.headers.get('Authorization');
    const [user, pass] = [env.BASIC_USER, env.BASIC_PASS];
    if (!auth || !isValid(auth, user, pass)) {
      return new Response('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      });
    }
    return await context.next();
   };
   
   const isValid = (auth, user, pass) => {
    const [scheme, encoded] = auth.split(' ');
    if (scheme !== 'Basic') return false;
    const decoded = atob(encoded).split(':');
    return decoded[0] === user && decoded[1] === pass;
};
EOF
fi

echo "[Cloudflare Pages] wrangler pages Deploying to ${PAGES_PROJECT_NAME}"
wrangler pages deploy public --project-name=${PAGES_PROJECT_NAME}


# Invalidate the cache of a CloudFlare Cache.
echo "[Cloudflare CDN] Invalidating cache..."
curl https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
    -d '{"purge_everything":true}'
echo "[Cloudflare CDN] Cache invalidated with purge_everything=true"
