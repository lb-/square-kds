"use strict";
var squareUrl = 'https://connect.squareup.com/v1/me/';
var headers = {
  Authorization: 'Bearer ' + app.squareAccessToken,
  Accept: 'application/json',
};
var options = {headers: headers};

var updateOrInsertPayment = function (payment, totals) {
  var existingPayment = db.Payments.findOne({_id: payment.id});
  if (existingPayment) {
    db.Payments.update({_id: existingPayment._id}, {$set: payment});
    totals.updated += 1;
  } else {
    payment._id = payment.id;
    db.Payments.insert(payment);
    totals.inserted += 1;
  }
}

Meteor.methods({
  squareGetPayments: function (paymentId) {
    var url = squareUrl + 'payments';
    if (paymentId) {
      url += '/' + paymentId;
    } else {
      url += '?order=DESC';
    }
    console.log('squareGetPayments', url);
    HTTP.call('GET', url, options, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        var totals = {inserted: 0, updated: 0};
        var data = result.data;
        if (_.isArray(data)) {
          _.each(data, function (payment) {
            updateOrInsertPayment(payment, totals);
          });
        } else {
          updateOrInsertPayment(data, totals);
        }
        console.log('totals', totals);
      }
    });
  },
  squareGetWebhooks: function () {
    console.log('square');
    var headers = {
      Authorization: 'Bearer ' + app.squareAccessToken,
      Accept: 'application/json',
    };
    var options = {
      headers: headers
    }
    HTTP.call('GET', squareUrl + 'webhooks', options, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result.data);
      }
    });
  }
});
