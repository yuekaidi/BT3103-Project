Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    name: 'home',
    template: 'home'
});

Router.route('/login');

Router.route('/register');

Router.route('/dashboard');

Router.route('/order');

Router.route('/menu');