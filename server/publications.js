"use strict";

Meteor.publish('payments', function (options) {
  options = options || {};
  console.log('publication called');
  var fields = {
    itemizations: 1,
    receipt_url: 1,
    created_at: 1,
  };
  return db.Payments.find({}, {fields: fields});
});
