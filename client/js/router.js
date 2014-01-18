
MobiRouter.map({
    'home': {
        path: '/:first/:second/',
        defaultTitle: 'Home',
        template: 'home',
        data: function(){ return {first: this.params.first, second: this.params.second}; },
    },
    'greeting': {
        path: '/greeting/:first/:last',
        defaultTitle: 'Wellcome </b>{:first} {:last}</b>!',
        template: 'hello',
    },
    'posts': {
        path: '/posts',
        defaultTitle: 'Posts',
        template: 'posts',
    },
    'userInfo': {
        path: '/userInfo',
        defaultTitle: 'Please, fill the form!',
        template: 'posts',
    },
    'about': {
        path: '/about',
        defaultTitle: 'About',
        template: 'about',
    }
});

MobiRouter.addSequence('Test Sequence', [
    {
        name: 'home',
        data: {first: 'First Value'}
    },
    {
        name: 'userInfo',
        data: {postsNum: 15}
    },
    {
        name: 'greeting',
        data: {}
    }
]);

MobiRouter.configure({
    desktopWidth: 840,
    desktopHeight: 480,
    headerHeight: 45,
    sidebarToggleBtn: 45,
    sidebarAutoOpenDesktop: true,
    sidebarDefaultWidth: 300,
    sidebarTemplate: 'sidebar',
});