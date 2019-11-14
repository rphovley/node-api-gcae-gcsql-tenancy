FROM node:12.13.0

ENV APP_DIRECTORY=/f0-datalake_api


RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb http://dl.yarnpkg.com/debian/ stable main" >> /etc/apt/sources.list.d/yarn.list \
  && apt-get update \
  && apt-get install -y yarn postgresql-contrib
  
RUN npm install -g pm2

RUN pm2 install profiler

WORKDIR $APP_DIRECTORY
COPY yarn.lock package.json ./
RUN yarn
COPY . $APP_DIRECTORY
# RUN npx gulp compilejs
