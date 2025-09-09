FROM node:lts-trixie-slim@sha256:ba533b824f504e19137d3c961f8f6ef5278b02d8bfa7010eabb1b836d3125ce4 AS builder

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig*.json ./

RUN npm install


FROM node:lts-trixie-slim@sha256:ba533b824f504e19137d3c961f8f6ef5278b02d8bfa7010eabb1b836d3125ce4 AS production

WORKDIR /app

RUN apt-get update && \
    apt-get install -y procps && \
    rm -rf /var/lib/apt/lists/*


COPY ./src ./src
COPY .env ./.env

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/tsconfig*.json /app/


CMD ["npm", "run", "start:dev"]
