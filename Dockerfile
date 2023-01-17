FROM node:16.17.1-alpine3.15 AS builder

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /app
COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn run build
FROM node:16.17.1-alpine3.15 AS server

ENV NODE_ENV=production
RUN yarn global add serve

WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/build ./build

ENV PORT=3001
EXPOSE 3001
USER node
CMD ["serve", "-s", "build"]