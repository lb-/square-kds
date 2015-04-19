"use strict";

Template.ticket.events({
  'click [data-action="clear-ticket"]': function () {
    db.Payments.update({_id: this._id}, {$set: {cleared: true}});
  },
  'click [data-action="recall-ticket"]': function () {
    db.Payments.update({_id: this._id}, {$set: {cleared: false}});
  }
});

Template.ticket.helpers({
  cleared: function () {
    if (this.cleared) {
      return this.cleared;
    } else {
      return false;
    }
  },
  items: function () {
    // console.log(this.itemizations);
    return this.itemizations;
  },
  paymentNote: function () {
    var result;
    // console.log(this.tender);
    if ( _.isArray(this.tender) ) {
      _.each(this.tender, function (tenderItem) {
        if (tenderItem.payment_note) {
          result = tenderItem.payment_note;
        }
      });
    }
    return result;
  }
});
