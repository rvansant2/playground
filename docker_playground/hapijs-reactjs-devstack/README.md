hapijs-reactjs-devstack
=========================
This is a full JavaScript Devstack using [docker-compose](https://docs.docker.com/compose/):

Requirements
--------------------------
* [Docker (native)](https://docs.docker.com/docker-for-mac/)

Devstack set up
--------------------------
* server directory (API)
    - [hapijs](https://hapijs.com/)
* client directory (FrontEnd)
    - [ReactJS](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)
        - Webpack
* Database
    - [MongoDB](https://docs.mongodb.com/manual/)
    
Run
--------------------------
* Run npm command in client directory: `npm run build`
* Run using a [make](https://www.gnu.org/software/make/) command: `make client`
    - client depends on server services and is linked to mongodb.

Todo
--------------------------
* Client build via `npm run build` and tie to Gulp watch
* Add Sass compilation with Gulp

    
