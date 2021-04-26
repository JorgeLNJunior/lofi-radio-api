#!/usr/bin/env bash

NODE_ENV=production npm run typeorm -- migration:run
NODE_ENV=production npm run seed:run
NODE_ENV=production npm start
