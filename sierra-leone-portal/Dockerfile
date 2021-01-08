# Devel stage
FROM node:12.18.2-slim AS devel

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .


# Build stage
FROM node:12.18.2-slim AS build

WORKDIR /usr/src/app

COPY --from=devel /usr/src/app/ ./

RUN npm run build


# Final stage
FROM node:12.18.2-slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public

CMD ["./node_modules/.bin/pm2-runtime","./node_modules/.bin/next", "--", "start", "-p", "3001"]
