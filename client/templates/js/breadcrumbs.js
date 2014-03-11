

Template.test_breadcrumbs.helpers({
    routes: function(){
        return MobiRouter.getSlideStack();
    }
});

Template.breadcrumbs_part.helpers({
    route_params: function(){
        var parameters = [],
            _this = this;
        _.each(this.urlParams, function(param, key){
            parameters.push({name: param, value: _this.params[param] || '<undefined>'});
        });
        return parameters;
    },
    isActive: function(){
        return this.position == MobiRouter.currentPosition() ? 'active' : '';
    }
});
