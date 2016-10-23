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

Router.route('/order', {
    template: 'order'
});

Router.route('/menu');

