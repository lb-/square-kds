"use strict";
var squareUrl = 'https://connect.squareup.com/v1/me/';

Meteor.methods({
  square: function () {
    console.log('square');
    var headers = {
      Authorization: 'Bearer ' + squareAccessToken,
      Accept: 'application/json',
    };
    var options = {
      headers: headers
    }
    HTTP.call('GET', squareUrl + 'payments', options, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        var total = 0;
        //console.log(result.content);

        _.each(result.data, function (payment) {

          payment._id = payment.id;
          if (! db.Payments.findOne({_id: payment._id})) {
            db.Payments.insert(payment);
            total += 1;
          }

        });

        console.log('total', total);
      }
    });
  }
});
