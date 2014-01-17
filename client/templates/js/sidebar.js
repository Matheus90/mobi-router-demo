
Template.sidebar.events({
    "mousedown .menu_home, touchstart .menu_home" : function(e){
        if( (new Date) - touchEventStarted < 1000 ) return false;
        MobiRouter.go('home', {eTarget: e.target, second: 25, first: function(){return +(new Date);}});
    },
    "mousedown .menu_greeting, touchstart .menu_greeting" : function(e){
        MobiRouter.go('greeting', {eTarget: e.target});
    },
    "mousedown .menu_posts, touchstart .menu_posts" : function(e){
        MobiRouter.go('posts', {eTarget: e.target});
    },
    "mousedown .menu_about, touchstart .menu_about" : function(e){
        MobiRouter.go('about', {eTarget: e.target});
    },
});