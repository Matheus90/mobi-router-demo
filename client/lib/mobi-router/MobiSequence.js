
MobiSequence = function(name, params){

    var _defaultParams = {
        name: '',
        routes: [],
        stackSize: 0
    };

    _.extend(_defaultParams, params);
    _defaultParams.name = name;
    _.extend(this, _defaultParams);
    this.stackSize = this.routes.length;


    /**
     * Return the actual url by opened slide and parameters
     *
     * @param params
     * @returns {string}
     */
    this.getPath = function(slide, params){
        if( !this.routes[slide-1] ) return '';
        params = params ? params : {};
        var newPath = '/'+this.name+'/'+slide;

        _.each(this.routes[slide-1].urlParams, function(p){
            newPath +=  (params[p] != undefined ? '/' + (_.isFunction(params[p]) ? params[p]() : params[p]) : '');
        });
        newPath = newPath.replace(/((\/\/).*)/, '/undefined/');

        return newPath;
    };

    this.actualRoute = function(){
        var route = this.routes[this.getSlideFromUrl()-1];
        return route ? route : false;
    };

    /**
     * Reading parameters from the url
     *
     * @param preParams
     * @returns {{}}
     * @private
     */
    function _readParams(preParams){
        var pathArr = this.path.split('/');
        var location = window.location.pathname.split('/');
        var params = {};
        _.each(pathArr, function(param, key){
            if( param.indexOf(':') == 0 ){
                params[param.replace(':', '')] = location[key];
            }
        });
        _.extend(params, preParams);
        return params;
    };

    this.getSlideFromUrl = function(){
        var location = window.location.pathname.split('/');
        return location[2] ? parseInt(location[2], 10) : 1;
    };

    this.getDataFromUrl = function(){
        return {};
        /*if( _.isFunction(this.data) ){
            this.params = _readParams.call(this, params);
            return this.data();
        }else
            return this.data;*/
    };

    this.checkUrlMatch = function(){
        var path = this.path,
            location = window.location,
            pathArr = path.split('/'),
            locArr = location.pathname.split('/');

        var i = 0,
            c = -1;
        _.each(locArr, function(l){
            if( l == pathArr[i] )
                c++;
            i++;
        });

        return c > -1 ? c : false;
    };

    return this;
};