'use strict';

/**
 * Created by rvansant2 on 11/22/16.
 */

const _             = require( 'lodash' );
const Fs            = require( 'fs' );
const Url           = require( 'url' );
const Mongoose      = require( 'mongoose' );
const Config        = require( 'config' );
const Routes        = require('./routes');
const UsersModel    = require('./modules/users/model');

exports.register = function ( server, config, next ) {
  const connection = {
    protocol: 'mongodb',
    slashes: true,
    host: `${config.host}`,
    pathname: `${config.name}`,
  };
  if ( _.get( config, 'user' ) && _.get( config, 'pass' ) ) {
    connection.auth = `${config.user}:${config.pass}`;
  }
  let options = {};
  if ( _.get( config, 'opts.ssl' ) ) {
    connection.query = {
      ssl: true
    };
    if ( _.get( config, 'opts.sslValidate' ) ) {
      const caFile = _.get( config, 'opts.sslFilePath' );
      if ( Fs.existsSync( caFile ) ) {
        const sslCA = Fs.readFileSync( caFile );
        options.sslCA = sslCA;
      } else {
        return next( 'Missing sslCA file when sslValidate is true' );
      }
    }
  }
  const mongoUri = Url.format( connection );
  Mongoose.connect( mongoUri, { server: options } );
  Mongoose.connection.on( 'error', function ( error ) {
    return next( error );
  });
  Mongoose.connection.once( 'open', function () {
    console.log( 'Database connected to ' + mongoUri );
    server.expose( 'Db', Mongoose );
    return next();
  });

  server.auth.strategy( 'jwt', 'jwt', 'required', {
    key: Config.get( 'oauth' ).secret,
    verifyOptions: { algorithms: [ Config.get( 'oauth' ).options.algorithm ] }
  });

  server.expose( 'User', UsersModel( Mongoose ) );
  server.route( Routes );

  next();
};

exports.register.attributes = {
  name: 'core'
};
