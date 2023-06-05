FROM node:18-buster

WORKDIR /usr/src/app

COPY ./package* ./
COPY ./yarn* ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "start"]
