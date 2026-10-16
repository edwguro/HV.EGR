FROM node:24-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV PNPM_FETCH_RETRIES=5
ENV PNPM_FETCH_TIMEOUT=300000
ENV PNPM_NETWORK_CONCURRENCY=4
RUN corepack enable
WORKDIR /app

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/eslint-config/package.json packages/eslint-config/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json
RUN --mount=type=cache,id=portfolio-pnpm-store,target=/pnpm/store,sharing=locked pnpm install --frozen-lockfile --prefer-offline

FROM dependencies AS builder
COPY . .
# Prisma validates DATABASE_URL while generating the client, although it does
# not establish a database connection during this build stage. Railway supplies
# the real value at deploy time through the PostgreSQL service reference.
ENV DATABASE_URL=postgresql://build:build@localhost:5432/portfolio
RUN pnpm db:generate && pnpm --filter @portfolio/api build

FROM node:24-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
RUN addgroup --system --gid 1001 nestjs && adduser --system --uid 1001 nestjs
COPY --from=dependencies --chown=nestjs:nestjs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nestjs /app/package.json ./package.json
COPY --from=builder --chown=nestjs:nestjs /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=nestjs:nestjs /app/prisma ./prisma
COPY --from=dependencies --chown=nestjs:nestjs /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder --chown=nestjs:nestjs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nestjs /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder --chown=nestjs:nestjs /app/apps/api/src/generated ./apps/api/src/generated
USER nestjs
EXPOSE 4000
CMD ["node", "apps/api/dist/main.js"]
