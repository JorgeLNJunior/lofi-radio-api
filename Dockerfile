FROM node:14-alpine

WORKDIR /usr/app/lofi-radio-api

RUN apk add --no-cache bash

COPY package*.json ./

RUN npm install --only=prod

RUN npm install typescript

RUN touch ./ormconfig.js

COPY ./scripts ./scripts

RUN chmod -R +x ./scripts
