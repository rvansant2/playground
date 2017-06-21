'use strict';
/**
 * Created by rvansant2 on 5/22/16.
 */

const _ = require( 'lodash' );

module.exports = _.merge( {}, {
  api: {
    port: 8000,
    address: '0.0.0.0',
    host: '0.0.0.0'
  },
  mongodb: {
    url: "mongodb://0.0.0.0:27017/identity",
    uri: "mongodb://0.0.0.0:27017/identity",
    settings: {},
    bluebird: false
  },
  db: {
    host: '0.0.0.0:27017',
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