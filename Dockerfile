FROM node:13-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn
COPY . .

RUN yarn run build:prod
EXPOSE 3003

# Remove source files
#RUN find ./src -mindepth 1 ! -regex '^./src/server\(/.*\)?' -delete
RUN rm -r webpack.config.js yarn.lock README.md .babelrc public

CMD [ "yarn", "run", "server:prod" ]
