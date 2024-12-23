FROM node:20-alpine

COPY ./package*.json ./
COPY ./tsconfig*.* ./
COPY ./nest-cli.json ./

RUN yarn install

COPY ./src ./src
COPY ./dist ./dist
COPY ./package* ./

RUN yarn build

WORKDIR /src

EXPOSE 8080
CMD [ "yarn", "start:prod" ]
