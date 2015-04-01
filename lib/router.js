// https://github.com/meteor-useraccounts/core/blob/master/Guide.md
AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/',
    // template: 'myLogin',
    // layoutTemplate: 'myLayout',
    redirect: '/working',
});

Router.configure({
  // DFL TODO: Implement templates for layout, loading, and 404
  //layoutTemplate: 'layout',
  //loadingTemplate: 'loading',
  //notFoundTemplate: 'notFound',
  waitOn: function() {
  // DFL TODO: Make sure this isn't subscribed to in unauthorized state
    return Meteor.subscribe('latestUserTask')
  }
});

Router.route('/working', {
  name: 'working',
  waitOn: function () {
    return [
      Meteor.subscribe('activeUsers'),
      Meteor.subscribe('tasksList')
    ];
  }
});


// Disable page access unless we're logged in
var requireLogin = function() {
  if (!Meteor.user() && !Meteor.loggingIn()) {
    Router.go('signin');
  }
  this.next();
}
Router.onBeforeAction(requireLogin);


// Make a /signout route we can follow to easily sign out
Router.route('signout');
Router.onBeforeAction(function() { AccountsTemplates.logout() }, {only: 'signout'});