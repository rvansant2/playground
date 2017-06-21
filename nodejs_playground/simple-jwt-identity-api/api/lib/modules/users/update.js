'use strict';

/**
 * Created by rvansant2 on 5/22/16.
 */

const _                   = require( 'lodash' );
const Joi                 = require( 'joi' );
Joi.objectId              = require('joi-objectid')(Joi);
const Boom                = require( 'boom' );
const Moment              = require( 'moment' );
const verifyUserIsUnique  = require( './methods' ).verifyUserIsUnique;
const hashPassword        = require( './methods' ).hashPassword;
const createJWTToken      = require( './methods' ).createJWTToken;
const Load                = require( './load' );

exports.description = 'Updates a user.';
exports.auth = { strategy: 'jwt' };
exports.validate = {
  payload: Joi.object( {
    username: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  } )
};
exports.validate.params = {
  id: Joi.objectId().required()
};
exports.pre = [
  { method: verifyUserIsUnique, assign: 'uniqueUser' },
  {
    method: Load.handler, assign: 'user'
  },
  {
    method: ( request, reply ) => {
      if ( request.pre.user && request.auth.credentials.id === request.params.id ) {
        return reply( request.pre.uniqueUser );
      }
      return reply();
    },
    assign: 'isAuthUser'
  }
];

exports.handler = function( request, reply ) {
  const User                = request.pre.user;
  let userPayload         = request.payload;
  if ( !request.pre.isAuthUser ) {
    return reply( Boom.badRequest( 'You are not allowed perform this task.' ) );
  }

  userPayload.modifiedAt    = Moment().toDate();
  hashPassword( userPayload.password ).then( function( hash ) {
    userPayload.password    = hash;
    userPayload             = _.merge( User, userPayload );
    User.save( userPayload, ( err, user ) => {
      if ( err ) {
        throw Boom.badRequest( err );
      }

      return reply( { id_token: createJWTToken( user ) } ).code( 201 );
    });
  });
};

