FROM node:14-alpine

WORKDIR /usr/app/lofi-radio-api

RUN apk add --no-cache bash

COPY package*.json ./

RUN npm install --only=prod

RUN touch ./ormconfig.js

COPY wait-for-it.sh ./

RUN chmod +x ./wait-for-it.sh
