FROM nodesource/xenial:latest

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-development}
ENV ROOT_PATH /javascript-devstack
RUN mkdir -p $ROOT_PATH
WORKDIR $ROOT_PATH
ADD package.json $ROOT_PATH/package.json
RUN npm install
ADD . $ROOT_PATH

EXPOSE 80
CMD npm start