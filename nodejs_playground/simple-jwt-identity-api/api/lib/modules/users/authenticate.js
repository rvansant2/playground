'use strict';

/**
 * Created by rvansant2 on 5/22/16.
 */

const Joi             = require( 'joi' );
const UserMethods     = require('./methods');

exports.description   = 'Authenticates a user.';
exports.auth          = false;
exports.validate      = {
  payload: Joi.alternatives().try(
    Joi.object({
      username: Joi.string().alphanum().min(2).max(30).required(),
      password: Joi.string().required()
    }),
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  )
};
exports.pre = [
  {
    method: UserMethods.verifyLoginCredentials,
    assign: 'user'
  }
];

exports.handler = function( request, reply ) {
  return reply( { id_token: UserMethods.createJWTToken( request.pre.user ) } ).code(201);
};