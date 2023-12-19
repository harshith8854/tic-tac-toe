# Stage 1
FROM node:21-alpine AS build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

# Stage 2

FROM nginx:1.25.3-alpine-slim

COPY --from=build-step /app/dist/tic-tac-toe /usr/share/nginx/html

EXPOSE 80