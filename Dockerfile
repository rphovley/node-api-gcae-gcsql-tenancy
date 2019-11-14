FROM node:12.13.0

ENV APP_DIRECTORY=/f0-datalake_api

RUN npm install -g pm2

RUN pm2 install profiler

WORKDIR $APP_DIRECTORY
COPY yarn.lock package.json ./
RUN yarn
COPY . $APP_DIRECTORY
# RUN npx gulp compilejs
