'use strict';
/**
 * Created by rvansant2 on 5/22/16.
 */

const _ = require( 'lodash' );

module.exports = _.merge( {}, {
  api: {
    port: 8000,
    address: 'mongodb',
    host: 'mongodb'
  },
  mongodb: {
    url: "mongodb://mongodb:27017/identity",
    uri: "mongodb://mongodb:27017/identity",
    settings: {},
    bluebird: false
  },
  db: {
    host: 'mongodb:27017',
    name: 'identity'
  },
  oauth: {
    secret: 'MFnXMJhcjtRjVA9w4p9jr4jC851OCXM8Xx24kQzhpCYW5RFbWsaMfgFA8v9X8die',
    options: {
      algorithm: 'HS256',
      expiresIn: '1h'
    }
  }
});