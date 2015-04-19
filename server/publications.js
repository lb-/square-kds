"use strict";

Meteor.publish('payments', function (options) {
  options = options || {sort: {created_at: -1}};
  var fields = {
    itemizations: 1,
    tender: 1,
    created_at: 1,
    cleared: 1,
  };
  //db.Payments.find().fetch()
  var query = {
    created_at: {
      $gte: moment().subtract(30,'minutes').toISOString()
    }
  };
  return db.Payments.find(query, {fields: fields});
});
