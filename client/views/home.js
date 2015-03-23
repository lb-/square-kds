"use strict";

Template.home.onCreated(function () {
  this.subscribe('payments', {});
});

Template.home.helpers({
  tickets: function () {
    return db.Payments.find({}).fetch();
  }
});
