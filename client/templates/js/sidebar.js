
Template.sidebar.events({
    "click .menu_item_home, touch .menu_item_home" : function(e){
        if( (new Date) - touchEventStarted < 1000 ) return false;
        MobiRouter.go('home', {eTarget: e.target, second: 25, first: function(){return +(new Date);}});
    },
    "click .menu_item_greeting, touch .menu_item_greeting" : function(e){
        MobiRouter.go('greeting', {eTarget: e.target});
    },
    "click .menu_item_posts, touch .menu_item_posts" : function(e){
        MobiRouter.go('posts', {eTarget: e.target});
    },
    "click .menu_item_about, touch .menu_item_about" : function(e){
        MobiRouter.go('about', {eTarget: e.target});
    },
});