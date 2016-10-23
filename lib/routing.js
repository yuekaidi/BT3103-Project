Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    name: 'home',
    template: 'home',
    function () {
  this.render('home');
}
});

Router.route('/register');

Router.route('/login');

Router.route('/dashboard');

Router.route('/order');

Router.route('/menu');

console.log('routing file')