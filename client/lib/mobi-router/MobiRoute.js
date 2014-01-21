
MobiRoute = function(name, params){

    var _defaultParams = {
        name: '',
        path: '',
        cleanPath: '',
        urlParams: '',
        template: '',
        data: {}
    };

    _.extend(_defaultParams, params);
    _defaultParams.name = name;
    _.extend(this, _defaultParams);
    _clearPath.call(this);

    function _clearPath(){
        var pathArr = this.path.split('/');
        var cPath = '';
        var uParams = [];
        _.each(pathArr, function(p){
            if( p.match(/:\w+/) )
                uParams.push(p.replace(':', ''));
            else
                cPath += p ? '/'+p : '';
        });
        this.cleanPath = cPath ? cPath : '/';
        this.urlParams = uParams;
    };

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


    /**
     * Reading parameters from the url and extend them with pre-defined parameters
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


    /**
     * Run data() with parameters if it's a function or return it if just an object
     *
     * @returns {object}
     */
    this.getData = function(){
        if( _.isFunction(this.data) ){
            this.params = _readParams.call(this, params);
            return this.data();
        }else
            return this.data;
    };


    /**
     * A little pointing function, used for find the actual route by the url
     *
     * @returns {number}
     */
    this.checkUrlMatch = function(){
        var path = this.cleanPath,
            location = window.location,
            pathArr = path.split('/'),
            locArr = location.pathname.split('/');

        if( location == path ) return 9999;

        var i = 0,
            c = -1.0;
        _.each(locArr, function(l){
            if( l == pathArr[i] )
                c += 1.0;
            i++;
        });
        if( i > c )
            _.each(this.urlParams, function(p){ c += p ? 0.01 : 0; });

        return c > -1 ? c : false;
    };

    return this;
};