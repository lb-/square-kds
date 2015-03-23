"use strict";

db.Payments = new Mongo.Collection('payments');


db.Payments.helpers({
  getCreatedAt: function() {
    return moment(this.created_at);
  },
  getIsOld: function () {
    var createdAt = this.getCreatedAt();
    var now = moment();
    var diff = now.diff(createdAt, 'seconds');
    var secondsUntilOld = app.secondsUntilOld || 120;
    if (diff >= secondsUntilOld) {
      return true;
    }
    return false;
  }
});
