'use strict';

/**
 * Created by rvansant2 on 5/22/16.
 */

module.exports = function ( db ) {
  let Schema = db.Schema;

  const userModel = new Schema( {
    email           :     { type: String, required: true, index: { unique: true } },
    username        :     { type: String, required: true, index: { unique: true } },
    password        :     { type: String, required: true },
    admin           :     { type: Boolean, required: true },
    status          :     {
      type          :     String,
      enum          :     [ 'disabled', 'enabled', 'other'  ],
      default       :     'enabled'
    },
    modifiedAt      :     { type: Date, required: true },
    createdAt       :     { type: Date, required: true }
  }, { collection   : 'users' } );

  return db.model( 'User', userModel );
};