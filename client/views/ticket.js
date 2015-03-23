"use strict";

Template.ticket.helpers({
  // old: function () {
  //   return Random.choice([true, false]);
  // },
  cleared: function () {
    return Random.choice([true, false]);
  },
  items: function () {
    // console.log(this.itemizations);
    return this.itemizations;
  }
});
