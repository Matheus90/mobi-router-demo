
Template.sidebar.events({
    "click .menu_item_home, touch .menu_item_home" : function(e){
        MobiRouter.go('home', {second: 25, first: function(){return +(new Date);}});
        MobiRouter.hideSidebar();
    },
    "click .menu_item_greeting, touch .menu_item_greeting" : function(e){
        MobiRouter.go('greeting');
        MobiRouter.hideSidebar();
    },
    "click .menu_item_posts, touch .menu_item_posts" : function(e){
        MobiRouter.go('posts');
        MobiRouter.hideSidebar();
    },
    "click .menu_item_about, touch .menu_item_about" : function(e){
        MobiRouter.go('about');
        MobiRouter.hideSidebar();
    },
    "click .menu_item_signup, touch .menu_item_signup" : function(e){
        MobiRouter.openSequence('signup', 1, {first: "90.matheus@gmail.com"});
        MobiRouter.hideSidebar();
    },
});