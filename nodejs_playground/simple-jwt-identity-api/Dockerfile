FROM nodesource/xenial:latest

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-development}
ENV ROOT_PATH /var/www/api
RUN mkdir -p $ROOT_PATH
WORKDIR $ROOT_PATH
ADD ./api/package.json $ROOT_PATH/package.json
RUN npm install
ADD ./api $ROOT_PATH

EXPOSE 8000
CMD ["npm", "start"]