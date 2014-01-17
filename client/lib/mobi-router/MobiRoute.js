
MobiRoute = function(name, params){

    var _defaultParams = {
        name: '',
        path: '',
        template: '',
        data: {}
    };

    _.extend(_defaultParams, params);
    _defaultParams.name = name;
    _.extend(this, _defaultParams);

    this.getPath = function(params){
        params = params ? params : {};
        var pathArr = this.path.split('/');
        var newPath = '';
        _.each(pathArr, function(param, key){
            if( param.indexOf(':') == 0 ){
                param = param.replace(':', '');
                newPath +=  (params[param] != undefined ? '/' + (_.isFunction(params[param]) ? params[param]() : params[param]) : '');
            }else
                newPath += param == '' ? '' : ('/'+param);
        });
        newPath = newPath.replace(/((\/\/).*)/, '/undefined/');
        return newPath;
    };

    function _readParams(self){
        var pathArr = self.path.split('/');
        var location = window.location.pathname.split('/');
        var params = {};
        _.each(pathArr, function(param, key){
            if( param.indexOf(':') == 0 ){
                params[param.replace(':', '')] = location[key];
            }
        });
        return params;
    };

    this.getData = function(){
        if( _.isFunction(this.data) ){
            this.params = _readParams(this);
            return this.data();
        }else
            return this.data;
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