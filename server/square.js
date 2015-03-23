"use strict";
var squareUrl = 'https://connect.squareup.com/v1/me/';

Meteor.methods({
  square: function () {
    console.log('square');
    var headers = {
      Authorization: 'Bearer ' + app.squareAccessToken,
      Accept: 'application/json',
    };
    var options = {
      headers: headers
    }
    HTTP.call('GET', squareUrl + 'payments', options, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        var totals = {inserted: 0, updated: 0};
        //console.log(result.content);

        _.each(result.data, function (payment) {

          payment._id = payment.id;
          var existingPayment = db.Payments.findOne({_id: payment._id});
          if (existingPayment) {
            db.Payments.update({_id: existingPayment._id}, {$set: payment});
            totals.updated += 1;
          } else {
            db.Payments.insert(payment);
            totals.inserted += 1;
          }

        });

        console.log('totals', totals);
      }
    });
  }
});
