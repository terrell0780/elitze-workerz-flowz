# syntax=docker/dockerfile:1
# ---------------------------------------------------------------------------
# Elitze WorkerzNow - production image
#
# The API serves the compiled client from the same origin, so a single
# container is a complete deployment. Built on a glibc base image because
# better-sqlite3 ships prebuilt binaries for glibc (musl/Alpine would require
# a full node-gyp toolchain at build time).
# ---------------------------------------------------------------------------

FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production \
    PORT=4000 \
    HOST=0.0.0.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist
COPY --from=build /app/shared ./shared

# Persistent volume for the SQLite database.
RUN mkdir -p .data && chown -R node:node .data

USER node
EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:4000/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "dist/api/index.js"]
