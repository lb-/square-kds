"use strict";

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('Home', {
  });
});
