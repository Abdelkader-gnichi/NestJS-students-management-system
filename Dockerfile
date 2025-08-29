FROM node:lts-trixie-slim@sha256:ba533b824f504e19137d3c961f8f6ef5278b02d8bfa7010eabb1b836d3125ce4 as builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install


FROM node:lts-trixie-slim@sha256:ba533b824f504e19137d3c961f8f6ef5278b02d8bfa7010eabb1b836d3125ce4 as production

WORKDIR /app

COPY ./src ./src

COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "run", "start:dev"]
