ARG NODE_VERSION=22.15.0
ARG CLOUDFLARE_ACCOUNT_ID=1234567890
ARG CLOUDFLARE_API_TOKEN=secret-api-token

FROM node:${NODE_VERSION}-slim AS base

ARG PORT=3000

WORKDIR /src

# Build
FROM base AS build

ENV NODE_OPTIONS=--max-old-space-size=7168

RUN npm install -g pnpm wrangler
COPY --link package.json pnpm-lock.yaml ./
COPY .npmrc ./

RUN pnpm install

COPY --link . .

RUN pnpm run generate

# Run
FROM base

ENV PORT=$PORT
ENV NODE_ENV=production

RUN apt-get update && apt-get install -y curl --no-install-recommends && rm -rf /var/lib/apt/lists/*

RUN npm install -g wrangler

COPY --from=build /src/.output ./.output
COPY --from=build /src/deploy.sh ./deploy.sh
RUN chmod +x ./deploy.sh
