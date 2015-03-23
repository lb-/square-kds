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

db.Payments.allow({
  update: function (userId, doc, fieldNames) {
    // console.log(fieldNames, fieldNames === ['cleared']);
    // the user must be logged in, and the only field editable is 'cleared'
    // if (userId && (fieldNames === ['cleared'])) {
    if ((fieldNames[0] === 'cleared') && (fieldNames.length === 1)) {
      return true;
    }
    return false;
  },
})
