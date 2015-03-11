AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/',
    // template: 'myLogin',
    // layoutTemplate: 'myLayout',
    redirect: '/working',
});


// Router.route('/start', 'task_start');

Router.route('/working');

