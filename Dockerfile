FROM node:16-alpine AS builder

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

CMD ["yarn", "start"]
