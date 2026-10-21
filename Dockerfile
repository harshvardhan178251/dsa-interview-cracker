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
FROM nginx:1.27-alpine AS runtime

RUN apk add --no-cache curl

COPY web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/web/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -fsS http://localhost/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
