'use strict';

/**
 * Created by rvansant2 on 5/22/16.
 */

module.exports = [
  {
    path:     '/users/authenticate',
    method:   'POST',
    config:   require( './authenticate' )
  },
  {
    path:     '/users',
    method:   'GET',
    config:   require( './list' )
  },
  {
    path:     '/users/create',
    method:   'POST',
    config:   require( './create' )
  },
  {
    path:     '/users/update/{id}',
    method:   'POST',
    config:   require( './update' )
  },
  {
    path:     '/users/{id}',
    method:   'GET',
    config:   require( './load' )
  }
];
