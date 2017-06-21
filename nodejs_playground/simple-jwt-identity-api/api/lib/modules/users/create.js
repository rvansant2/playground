'use strict';

/**
 * Created by rvansant2 on 5/22/16.
 */

const Joi                 = require( 'joi' );
const Boom                = require( 'boom' );
const Moment              = require( 'moment' );
const verifyUserIsUnique  = require( './methods' ).verifyUserIsUnique;
const hashPassword        = require( './methods' ).hashPassword;
const createJWTToken      = require( './methods' ).createJWTToken;
const Load                = require( './load' );

exports.description = 'Creates a new user.';
exports.auth = false;

exports.validate = {
  payload: Joi.object( {
    username: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  } )
};

exports.pre = [
  { method: verifyUserIsUnique, assign: 'user' }
];

exports.handler = function( request, reply ) {
  const User              = request.server.plugins.core.User;
  const userPayload       = request.payload;
  userPayload.modifiedAt  = Moment().toDate();
  userPayload.createdAt   = Moment().toDate();
  userPayload.admin       = false;

  hashPassword( userPayload.password ).then( function( hash ) {
    userPayload.password = hash;
    const userModel = new User( userPayload );
    userModel.save( ( err, user ) => {
      if (err) {
        throw Boom.badRequest(err);
      }

      return reply( { id_token: createJWTToken( user ) } ).code( 201 );
    });
  });
};

// exports.response = {
//   modify: true,
//   schema: Load.response.schema
// };