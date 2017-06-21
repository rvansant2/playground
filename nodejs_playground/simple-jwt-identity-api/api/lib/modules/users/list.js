'use strict';

/**
 * Created by rvansant2 on 5/22/16.
 */

const Joi                 = require( 'joi' );
const Boom                = require( 'boom' );

exports.description = 'Lists all users.';
exports.auth = { strategy: 'jwt' };
exports.validate = {};
exports.pre = [];

exports.handler = function( request, reply ) {
  const User = request.server.plugins.core.User;
  User.find( { status: { '$ne': 'disabled' } } )
    .select( '-password -__v -admin' )//change this to Joi object response validation
    .exec( ( err, users ) => {
      if ( err ) {
        throw Boom.badRequest( err );
      }
      if ( !users.length ) {
        throw Boom.notFound( 'No users found!' );
      }
      return reply( users );
    });
};
