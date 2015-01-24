AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/',
    // template: 'myLogin',
    // layoutTemplate: 'myLayout',
    redirect: '/work',
});


Router.route('/work');
