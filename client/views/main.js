"use strict";

Template.main.onCreated(function () {
  this.subscribe('payments', {});
});

Template.main.helpers({
  tickets: function () {
    var query = {cleared: {$ne: true} };
    var viewing = Session.get('view');
    var options = {sort: {created_at: -1}};
    if (viewing === 'cleared') {
      query = {cleared: true};
    }
    // console.log('query', query);
    // var count = db.Payments.find(query).count();
    return db.Payments.find(query, options).fetch();
  }
});
