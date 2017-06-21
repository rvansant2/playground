'use strict';

/**
 * Created by rvansant2 on 5/22/17.
 */
const _         = require( 'lodash' );
const Users     = require( './modules/users/index' );

module.exports  = _.flatten( [
  Users.routes
] );

