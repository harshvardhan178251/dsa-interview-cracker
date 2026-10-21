# syntax=docker/dockerfile:1
#
# Builds the study site and serves it with nginx.
#
#   docker build -t dsa-cracker .
#   docker run --rm -p 8080:80 dsa-cracker
#
# Build arguments:
#   --build-arg VITE_SITE_URL=https://dsa.example.com   canonical + sitemap origin
#   --build-arg BASE_PATH=/                              set for a sub-path deploy

# ---------------------------------------------------------------- build stage
FROM node:20-alpine AS build

WORKDIR /app/web

# Install dependencies first so the layer is cached across source changes.
COPY web/package.json web/package-lock.json ./
RUN npm ci

COPY web/ ./

ARG VITE_SITE_URL=""
ARG BASE_PATH="/"
ENV VITE_SITE_URL=$VITE_SITE_URL
ENV BASE_PATH=$BASE_PATH

RUN npm run build

# --------------------------------------------------------------- serve stage
FROM node:20-alpine AS runtime

# The backend compiles user-submitted Java, so the image needs a JDK.
RUN apk add --no-cache curl nginx openjdk17-jdk && \
    ln -sf /usr/lib/jvm/java-17-openjdk /usr/lib/jvm/default-jvm

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk
ENV PORT=8080
ENV HOST=127.0.0.1

WORKDIR /app/web

COPY --from=build /app/web/package.json /app/web/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/web/dist ./dist
COPY --from=build /app/web/server ./server
COPY --from=build /app/web/scripts ./scripts
COPY --from=build /app/web/src/data ./src/data

COPY web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost/api/health > /dev/null || exit 1

# nginx serves the static site and proxies /api to the Node compiler backend.
CMD ["/bin/sh", "-c", "node server/index.js & exec nginx -g 'daemon off;'"]
