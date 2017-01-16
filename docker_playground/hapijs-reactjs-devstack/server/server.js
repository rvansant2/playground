'use strict';

const Hapi = require( 'hapi' );

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  address: '0.0.0.0',
  host: 'localhost',
  port: ( process.env.NODE_ENV && process.env.NODE_ENV === 'production' ) ? 80 : 8080
});

// Add the route
server.route(
  {
    method: 'GET',
    path:'/',
    handler: function ( request, reply ) {

      return reply( { data: 'Server running at: ' + server.info.uri, version: process.version } );
    }
  }
);

server.route(
  {
    method: 'GET',
    path:'/hello',
    handler: function ( request, reply ) {

      return reply( { data: 'hello world' } );
    }
  }
);

// Start the server
server.start( ( err ) => {
  if ( err ) {
    throw err;
  }
  console.log( 'Server running at:', server.info.uri );
});