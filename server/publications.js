"use strict";

Meteor.publish('payments', function (options) {
  options = options || {sort: {created_at: -1}};
  var fields = {
    itemizations: 1,
    // receipt_url: 1,
    created_at: 1,
    cleared: 1,
  };
  return db.Payments.find({}, {fields: fields});
});
