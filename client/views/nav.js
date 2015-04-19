"use strict";

Template.nav.events({
  'click [data-action="change-view"]': function (event) {
    Session.set('view', event.target.dataset.view);
  },
  'click [data-action="square-sync"]': function (event) {
    Meteor.call('squareGetPayments', function (error) {
      if (error) {
        toastr.warning(error.message);
      } else {
        toastr.info('Sync started');
      }
    });

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
