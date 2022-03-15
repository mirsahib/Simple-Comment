FROM node:latest

WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock /frontend/
COPY . ./

RUN yarn install 


CMD ["yarn","start"]