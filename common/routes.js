"use strict";

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('Home', {
    data: function () {
      return {
        tickets: ['1','2','3','4','5'],
      };
    }
  });
});
