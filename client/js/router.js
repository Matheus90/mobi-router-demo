

MobiRouter.configure({
    canISpeak: true,
    defaultTitle: 'Mobi-Router Demo Site',
    desktopWidth: 800,
    desktopHeight: 600,
    mobileWidth: 400,
    headerHeight: 45,
    sidebarMoveTime: 300,
    sidebarMoveEasing: 'easeOutExpo',
    sidebarToggleBtn: 45,
    sidebarDefaultWidth: 300,
    sidebarTemplate: 'sidebar',
    notFoundTemplate: 'not_found',
    notFoundTitle: '404, Page not found (custom title)',
    loadingTemplate: true, //'loading',
    minLoadingTemplateTime: 3000,
    pageMoveTime: 600,
    pageMoveEasing: 'easeInOutQuart',
});

MobiRouter.setViewTypes({
    TableView: 'mobi_tableview'
});

MobiRouter.map({
    'home': {
        path: '/:first',
        defaultTitle: 'Home',
        template: 'home',
        data: function(){ return {first: this.params.first, fffsss: this.params.second}; },
    },
    'greeting': {
        path: '/greeting/:first/:last',
        defaultTitle: 'Wellcome <i> {:last} {:first} </i>!',
        template: 'hello',
        data: function(){ return {first: this.params.first, last: this.params.last}; },
        buttons: {backBtnText: 'Home'},
    },
    'animals': {
        path: 'animals',
        defaultTitle: 'Animals',
        routeType: 'TableView',
        rows: [
            {
                id: 'mammals-link',
                classExtension: 'custom-link',
                title: 'Mammals',
                type: 'link',
                subTitle: function() { return 'Count: <b>'+(_.keys(Animals.mammals).length)+'</b>'; },
                action: function(){ MobiRouter.go('mammals', true); },
            },
            {
                title: 'Birds',
                type: 'link',
                subTitle: function() { return 'Count: <b>'+(_.keys(Animals.birds).length)+'</b>'; },
                action: function(){ MobiRouter.go('birds', true); },
            },
            {
                title: 'Reptiles',
                type: 'link',
                subTitle: function() { return 'Count: <b>'+(_.keys(Animals.reptiles).length)+'</b>'; },
                action: function(){ MobiRouter.go('reptiles', true); },
            },
            {
                id: 'first-action-btn',
                classExtension: 'custom-action-btn',
                title: 'Action Button',
                type: 'button',
                buttonText: 'Delivered',
                subTitle: 'subtitle for action button',
                isButton: function(){ return Session.get('first-action-btn') !== false; },
                replaceBtn: function(){ var d = Session.get('fab-date'); return 'Delivered <br/>on <b>'+d.toLocaleDateString()+'</b><br/>at <b>'+d.toLocaleTimeString()+'</b>'; },
                btnActive: function(){ return true; },
                action: function(){ Session.set('fab-date', new Date()); Session.set('first-action-btn', false); },
            },
            {
                id: 'test-switch',
                classExtension: 'custom-action-btn',
                title: 'Newsletter subscription',
                type: 'switch',
                buttonText: ['On', 'Off'],
                subTitle: 'subtitle for action button',
                state: function(){ return Boolean(Session.get('switcher-state')); },
                action: function(){ Session.set('switcher-state', !Boolean(Session.get('switcher-state'))); },
            }
        ],
    },
    'mammals': {
        path: '/mammals',
        defaultTitle: 'Mammals',
        template: 'animals',
        data: function(){ return {type: 'mammal'}; },
        buttons: {backBtnText: 'Animals'},
        classExtensions: {
            page: 'lightsteelblue-bg',
            header: 'orange-bg',
        },
    },
    'mammal-profile': {
        path: '/mammal-profile/:id',
        defaultTitle: '</b> {:name} </b>',
        template: 'mammal_profile',
        data: function(){ return Animals.mammals[this.params.id]; },
        buttons: {backBtnText: 'Mammals'},
        classExtensions: {
            //page: 'lightsteelblue-bg',
            header: 'orange-bg',
        },
    },
    'birds': {
        path: '/birds',
        defaultTitle: 'Birds',
        template: 'animals',
        data: function(){ return {type: 'bird'}; },
        buttons: {backBtnText: 'Animals'},
        classExtensions: {
            page: 'lightsteelblue-bg',
            header: 'blue-bg',
        },
    },
    'bird-profile': {
        path: '/bird-profile/:id',
        defaultTitle: '</b> {:name} </b>',
        template: 'bird_profile',
        data: function(){ return Animals.birds[this.params.id]; },
        buttons: {backBtnText: 'Birds'},
        cssExtensions: {
            header: 'blue-bg',
        },
    },
    'reptiles': {
        path: '/reptiles',
        defaultTitle: 'Reptiles',
        template: 'animals',
        data: function(){ return {type: 'reptile'}; },
        buttons: {backBtnText: 'Animals'},
        classExtensions: {
            page: 'lightsteelblue-bg',
            header: 'green-bg',
        },
    },
    'reptile-profile': {
        path: '/reptile-profile/:id',
        defaultTitle: '</b> {:name} </b>',
        template: 'reptile_profile',
        data: function(){ return Animals.reptiles[this.params.id]; },
        buttons: {backBtnText: 'Reptiles'},
        classExtensions: {
            header: 'green-bg',
        },
    },
});

/*
Deps.autorun(function(){
    var trigger = Session.get('mobi_refresh_trigger');
    var posTrigger = Session.get('mobi-router-position');
    var dataTrigger = Session.get('mobi-router-data');
    console.log(trigger, posTrigger, dataTrigger);
});
*/

