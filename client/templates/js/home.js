/**
 *
 */

Template.home.helpers({
    sessionTest: function(){
        var test = Session.get('test');
        return parseFloat(test/2)*10;
    },
    //first: function(){ return Session.get('first'); },
});

Template.home.events({
    'mouseup #go_greeting, touchend #go_greeting': function(){
        return MobiRouter.go('greeting', {}, true);
    }
});