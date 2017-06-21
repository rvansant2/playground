'use strict';
/**
 * Created by rvansant2 on 11/22/16.
 */

const Config  = require( 'config' );
const Glue    = require( 'glue' );

const manifest = {
  connections : [
    {
      port: 8000,
      routes: {
        cors: true,
        timeout: { server: 10000 }
      }
    }
  ],
  server: {
    debug: {
      log: [ 'error' ]
    }
  },
  registrations: [
    {
      plugin: {
        register: 'blipp',
        options: {}
      }
    },
    {
      plugin: {
        register: 'good',
        options: {
          ops: {
            interval: 3000
          },
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [ { log: '*', response: '*', error: '*' } ]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ]
          }
        }
      }
    },
    {
      plugin: {
        register: 'hapi-auth-jwt',
        name: 'jwt'
      }
    },
    {
      plugin: {
        register: './lib',
        options: Config.get( 'db' )
      }
    }
  ]
};

if ( require.main === module ) {
  Glue.compose( manifest, { relativeTo: __dirname }, function ( err, server ) {
    try {
      server.start( function ( err ) {
        if ( err ) {
          console.error( err );
        } else {
          console.log( `Server running at ${server.info.uri}` );
        }
      });
    } catch( err ) {
      console.error( err );
    }
  });
}

module.exports = manifest;
