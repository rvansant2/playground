
const http      = require('http');
const fs        = require('fs');
const path      = require('path');
const mime      = require('mime');
const port      = ( process.env.NODE_ENV && process.env.NODE_ENV === 'production' ) ? 80 : 3000 ;
const basePath  = ( process.env.NODE_ENV && process.env.NODE_ENV === 'production' ) ? 'public' : 'build' ;
const cache     = {};

/**
 * Created by rvansant2 on 1/4/17.
 */

function send404( response ) {
  response.writeHead( 404, { 'Content-Type': 'text/plain' } );
  response.write( 'Error 404: resource not found.' );
  response.end();
}

function sendFile( response, filePath, fileContents ) {
  response.writeHead(
    200,
    { 'Content-Type': mime.lookup( path.basename( filePath ) ) }
  );
  response.end( fileContents );
}

function serveStatic( response, cache, absPath ) {
  if ( cache[ absPath ] ) {
    sendFile( response, absPath, cache[ absPath ] );
  } else {
    fs.stat( absPath, function( err, exists ) {
      if ( err ) {
        send404( response );
      }

      fs.readFile( absPath, function( err, data ) {
        if ( err ) {
          send404( response );
        } else {
          cache[ absPath ] = data;
          sendFile( response, absPath, data );
        }
      });
    });
  }
}

const server = http.createServer( function( request, response ) {
  let filePath = false;
  if ( request.url === '/' ) {
    filePath = basePath + '/index.html';
  } else {
    filePath = basePath + request.url;
  }

  let absPath = './' + filePath;
  serveStatic( response, cache, absPath );
});

server.listen( port, function() {
  console.log( 'Server listening on port ' + port + '.');
});
