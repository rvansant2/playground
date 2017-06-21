'use strict';

/**
 * Created by rvansant2 on 5/22/16.
 */

const Config  = require( 'config' );
const JWT     = require( 'jsonwebtoken' );
const OAuth   = Config.get( 'oauth' );
const Boom    = require( 'boom' );
const Bcrypt  = require( 'bcrypt' );

const createJWTToken = function ( user ) {
  let scopes = false;
  if ( user.admin ) {
    scopes = 'true';
  }
  return JWT.sign( {
    id: user._id,
    username: user.username,
    scope: scopes },
    OAuth.secret,
    OAuth.options
  );
};

const verifyUserIsUnique = function ( request, reply ) {
  let User = request.server.plugins.core.User;
  User.findOne({
    $or: [
      { email: request.payload.email },
      { username: request.payload.username }
    ]
  }, ( err, user ) => {
    if ( user ) {
      if ( ( ! request.auth.credentials && user.username === request.payload.username ) || user.username === request.payload.username && ( request.auth.credentials && typeof request.auth.credentials.id !== 'undefined' && request.auth.credentials.id !== user._id.toString() ) ) {
        return reply( Boom.badRequest( 'Username is already taken.' ) );
      }
      if ( ( ! request.auth.credentials && user.email === request.payload.email ) || user.username === request.payload.username && ( request.auth.credentials && typeof request.auth.credentials.id !== 'undefined' && request.auth.credentials.id !== user._id.toString() ) ) {
        return reply( Boom.badRequest( 'Email is already taken.' ) );
      }
    }
    return reply( request.payload );
  });
};

const verifyLoginCredentials = function ( request, reply ) {
  let User = request.server.plugins.core.User;
  const password = request.payload.password;
  User.findOne({
    $or: [
      { email: request.payload.email },
      { username: request.payload.username }
    ]
  }, ( err, user ) => {
    if ( user ) {
      Bcrypt.compare( password, user.password, ( err, isValid ) => {
        if ( isValid ) {
          return reply( user );
        } else {
          return reply( Boom.badRequest( 'Incorrect password!' ) );
        }
      });
    } else {
      return reply( Boom.badRequest( 'Incorrect username or email!' ) );
    }
  });
};

const hashPassword = function hashPassword( password ) {
  return new Promise( function ( resolve, reject ) {
    Bcrypt.genSalt( 10, function ( err, salt ) {
      if ( err ) {
        reject( Boom.badRequest( 'Bad password generation.' ) );
      }
      Bcrypt.hash( password, salt, function ( err, hash ) {
        if ( err ) {
          reject( Boom.badRequest( 'Bad password hash.' ) );
        }
        resolve( hash );
      });
    });
  });
};

module.exports = {
  createJWTToken          :   createJWTToken,
  verifyUserIsUnique      :   verifyUserIsUnique,
  verifyLoginCredentials  :   verifyLoginCredentials,
  hashPassword            :   hashPassword
};

