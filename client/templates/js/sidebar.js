
Template.sidebar.events({
    "click .menu_item_home, touchend .menu_item_home" : function(e){
        MobiRouter.go('home', {second: 25});
        MobiRouter.hideSidebar();
    },
    "click .menu_item_greeting, touchend .menu_item_greeting" : function(e){
        MobiRouter.go('greeting');
        MobiRouter.hideSidebar();
    },
    "click .menu_item_animals, touchend .menu_item_animals" : function(e){
        MobiRouter.go('animals');
        MobiRouter.hideSidebar();
    },
});