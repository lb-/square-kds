"use strict";

Template.ticketItem.helpers({
  qty: function () {
    var quantity = this.quantity;
    return Math.round(quantity || 1);
  },
  itemCategory: function () {
    return this.item_detail.category_name;
  }
});
