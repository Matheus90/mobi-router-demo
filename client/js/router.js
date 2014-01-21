
MobiRouter.map({
    'home': {
        path: '/:first/:second/',
        defaultTitle: 'Home',
        template: 'home',
        data: function(){ return {first: this.params.first, second: this.params.second}; },
    },
    'greeting': {
        path: '/greeting/:first/:last',
        defaultTitle: 'Wellcome </b> {:last} {:first} </b>!',
        template: 'hello',
        data: function(){ return {first: this.params.first, last: this.params.last}; },
    },
    'posts': {
        path: '/posts/posts',
        defaultTitle: 'Posts',
        template: 'posts',
    },
    'userInfo': {
        path: '/userInfo',
        defaultTitle: 'Posts page with button',
        template: 'posts',
    },
    'about': {
        path: '/posts/about',
        defaultTitle: 'About',
        template: 'about',
    },
    'registration': {
        path: '/registration',
        defaultTitle: 'Registration',
        template: 'user_info'
    }
});

MobiRouter.addSequence('signup', [
    {
        name: 'registration',
        data: {}
    },
    {
        name: 'userInfo',
        data: {postsNum: 15}
    }
]);

MobiRouter.configure({
    desktopWidth: 800,
    desktopHeight: 600,
    headerHeight: 45,
    sidebarToggleBtn: 45,
    /*sidebarAutoOpenDesktop: true,*/
    sidebarDefaultWidth: 300,
    sidebarTemplate: 'sidebar',
});