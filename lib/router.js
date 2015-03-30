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
