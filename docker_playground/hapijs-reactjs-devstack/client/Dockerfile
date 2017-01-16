FROM nodesource/xenial:latest

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-development}
ENV ROOT_PATH /javascript-devstack
RUN mkdir -p $ROOT_PATH/public
WORKDIR $ROOT_PATH
ADD package.json $ROOT_PATH/package.json
RUN npm install
COPY ./index.js $ROOT_PATH/index.js
COPY ./build/ $ROOT_PATH/public

EXPOSE 80
CMD npm run serve