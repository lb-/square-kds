"use strict";

Template.nav.onCreated = function () {
  Session.setDefault('view', 'current');
};

Template.nav.events({
  'click [data-action="change-view"]': function (event) {
    Session.set('view', event.target.dataset.view);
  }
});

Template.nav.helpers({
  currentOrders: function () {
    var count = db.Payments.find({cleared: {$ne: true} }).count();
    var s = '';
    if ( (count > 1) || (count === 0) ) {
      s = 's';
    }
    return count + ' Current Order' + s;
  },
  viewingCurrent: function () {
    var viewing = Session.get('view');
    return viewing === 'current';
  }
});
