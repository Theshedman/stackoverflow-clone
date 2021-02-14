FROM node:10.16-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git curl openssh make python \
    busybox-extras yarn

RUN yarn global add knex

RUN mkdir -p /home/stackoverflow-clone

COPY . /home/stackoverflow-clone

WORKDIR /home/stackoverflow-clone

RUN yarn install

RUN yarn tsc

RUN yarn migrate:up

ENV REDIS_DB_URL=redis://Iv90DpfR9QDDqbMkWI398hD8xINAuvzt@52.90.199.226:10258 \
    REDIS_DB_PORT=10258

EXPOSE 4020

CMD ["yarn", "start"]
