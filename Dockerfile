FROM node:16-alpine AS builder

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
FROM node:16-alpine AS server

ENV NODE_ENV=production
RUN npm install -g serve

WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/build ./build

ENV PORT=3001
EXPOSE 3001
USER node
CMD ["serve", "-s", "build"]