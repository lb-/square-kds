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
  items: function () {
    // console.log(this.itemizations);
    return this.itemizations;
  }
});
