FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/

RUN yarn install

COPY . /usr/src/app/
CMD ["yarn", "start"]
