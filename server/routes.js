"use strict";

Picker.route('/square', function(params, request, response, next) {
  request.setEncoding('utf8');
  // {
  //   "entity_id": "9TS30Y65WKWMH",
  //   "event_type": "PAYMENT_UPDATED",
  //   "merchant_id": "7HDG4A4VV7KY0"
  // }
  //console.log(request.body);

  // request.on('data', function (chunk) {
  //   var data = JSON.parse(chunk);
  //   console.log(
  //     'entity_id: ', data.entity_id,
  //     'event_type:', data.event_type
  //   );
  //   Meteor.call('squareGetPayments', data.entity_id);
  // });

  request.on('data', Meteor.bindEnvironment(function (chunk) {
    var data = JSON.parse(chunk);
    console.log(
      'entity_id: ', data.entity_id,
      'event_type:', data.event_type
    );
    Meteor.call('squareGetPayments', data.entity_id);
  }, function (error) {
    console.log(error.message);
  }));

  request.on('error', function(error) {
    console.log('problem with request: ' + error.message);
  });

  response.end('OK');
});
