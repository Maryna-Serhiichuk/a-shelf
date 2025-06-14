FROM node:18-alpine

RUN corepack enable

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]