FROM node:lts-trixie-slim@sha256:ba533b824f504e19137d3c961f8f6ef5278b02d8bfa7010eabb1b836d3125ce4 AS builder

WORKDIR /app


COPY package*.json ./
COPY tsconfig*.json ./


RUN npm ci

# Copy source and build
COPY ./src ./src
RUN npm run build

# --- Production stage ---
FROM node:lts-trixie-slim@sha256:ba533b824f504e19137d3c961f8f6ef5278b02d8bfa7010eabb1b836d3125ce4 AS production

WORKDIR /app

# Install only runtime deps
COPY package*.json ./
RUN npm ci --omit=dev


COPY --from=builder /app/dist ./dist


COPY .env ./


RUN apt-get update \
    && apt-get install -y procps \
    && rm -rf /var/lib/apt/lists/*

CMD ["node", "dist/main.js"]
