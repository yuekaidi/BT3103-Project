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

Router.route('/menu');

Router.route('/outlets');

Router.route('/profile');

Router.route('/coupon');

Router.route('/visualization');