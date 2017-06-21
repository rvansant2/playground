'use strict';

/**
 * Created by rvansant2 on 5/22/16.
 */

const Joi                 = require( 'joi' );
Joi.objectId              = require('joi-objectid')(Joi);
const Boom                = require( 'boom' );

exports.description = 'Finds a user and sends a response schema.';
exports.auth = { strategy: 'jwt' };
exports.validate = {};
exports.validate.params = {
  id: Joi.objectId().required()
};

exports.handler = ( request, reply ) => {
  const User        = request.server.plugins.core.User;
  User.findOne(
    { _id: request.params.id, status: { '$ne': 'disabled' } },
    ( error, user ) => {
      if ( error ) {
        return reply( Boom.badImplementation( error.message, error ) )
      }
      if ( !user ) {
        return reply( Boom.notFound( 'The user does not exist.' ) );
      }

      return reply( user );
    })
};
