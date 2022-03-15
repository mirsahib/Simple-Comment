FROM node:latest

WORKDIR /server

COPY package.json /server/
COPY yarn.lock /server/
COPY . ./
RUN yarn install


CMD ["yarn","run","dev"]