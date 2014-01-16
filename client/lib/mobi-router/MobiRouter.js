
Router = function(){

    // Default settings for Mobi-Router
    var _settings = {
        desktopWidth: 840,
        desktopHeight: 480,
        headerHeight: 45,
        sidebarToggleBtn: 45,
        sidebar: true,
        sidebarAutoOpen: {
            desktop: true,
            tablet: true,
            phone: false
        },
        sidebarDefaultWidth: 200,
        sidebarTemplate: 'sidebar',
    };
    this.settings = {};

    // Storing sizes of page elements
    this.sizes = {
        router: {width: 0, height: 0},
        sidebar: {width: 0, height: 0},
        main: {width: 0, height: 0},
        header: {width: 0, height: 0},
        content: {width: 0, height: 0},
    };

    // Sidebar visibility
    this.sidebarShown = false;

    // Main content translate coords
    this.mainTranslateX = 0;

    // Is the site shown on full screen
    this.showFullScreen = false;

    // I scroll handler for sidebar
    var _sidebarIScroll;

    // This is the original storage of routes
    var _routeMap = {};

    // Storage of prev/actual/next paths
    var _routes = {};

    // Storage of page sequences, each sequence works like a separate slider.
    // It's an opportunity to create sign up sequences or sth. else that can be passed from left to right trough slides
    var _sequences = {};

    // The sequence currently in use
    var _currentSequence = {};

    this.calculateSizes = function(width, height){
        var settings = this.settings;

        this.showFullScreen = isMobile || Boolean(settings.desktopWidth > width || settings.desktopHeight > height);
        if( isMobile ){
            this.sizes.router.width = width;
            this.sizes.router.height = this.sizes.sidebar.height = this.sizes.main.height = height;
        }else{
            this.sizes.router.width = this.showFullScreen ? width : settings.desktopWidth;
            this.sizes.router.height = this.sizes.main.height = this.sizes.sidebar.height = this.showFullScreen ? height : settings.desktopHeight;
        }
        this.sizes.sidebar.width = settings.sidebarDefaultWidth > (width - this.settings.sidebarToggleBtn) ? (width - settings.sidebarToggleBtn) : settings.sidebarDefaultWidth;
        this.sizes.main.width = ( this.sidebarShown && (this.sizes.sidebar.width && (this.sizes.router.width / this.sizes.sidebar.width < 2.5)) ) ? this.sizes.router.width - this.sizes.sidebar.width : this.sizes.router.width;
        this.sizes.header.height = settings.headerHeight;
        this.sizes.header.width = this.sizes.main.width;
        this.sizes.content.width = this.sizes.main.width;
        this.sizes.content.height = this.sizes.main.height - this.sizes.header.height;
    };

    // Calculating page data
    function _getData(data, params){
        var ret = {};
        if( data == undefined ) return ret;
        if( _.isFunction(data) ) return data();
        if( typeof data == 'Object' ) return data;
        return {data: data};
    };

    // Check if the route exists, return the route if it does and return false if not
    function _getRoute(name){
        var route = _routeMap[name];
        if( route != undefined) return route;

        route = false;
        _.each(_.values(_routeMap), function(r){
            if( r.path.indexOf(name) == -1 ) return;

            route = r;
        });

        return route ? route : false;
    };

    // Protected init function, runs after configure() ends
    function _init(){
        var _self = this;
        if( document.readyState != 'complete' ){
            Meteor.setTimeout(function(){
                return _init.call(_self);
            }, 25);
            return;
        }
        console.log('Mobi-Router: initializing');

        resizeable.init(true);

        if( _sidebarIScroll ) _sidebarIScroll.refresh();
        else Meteor.setTimeout(function(){
            _sidebarIScroll = new iScroll('mobi_sidebar', {hScroll: false, hScrollbar: false, vScroll: true, vScrollbar:false, fadeScrollbar: true});
        }, 100);
    };

    function _setMenuItemActive(params){
        if( params == undefined || params.eTarget == undefined ) return params;

        var target = params.eTarget;
        delete params.eTarget;

        _.each(document.getElementsByClassName('active_sidebar_item'), function(item){
            item.className = item.className.replace('active_sidebar_item', '');
        });
        target.className += ' active_sidebar_item';

        return params;
    };

    // Save settings defined by developer
    this.configure = function(settings){
        console.log('Mobi-Router: configuring');
        _settings = _.extend(_settings, settings);
        this.settings = _settings;
        _init.call(this);
    };

    // Storing the map given by developer
    this.map = function(map){
        console.log('Mobi-Router: saving router-map');
        _.each(map, function(route, name){
            _routeMap[name] = new Route(name, route);
        });
        return true;
    };

    // Add new sequence to the storage
    this.addSequence = function(name, routes){
        if( _sequences[name] != undefined ) return false;
        console.log('Mobi-Router: adding route sequence');

        // Create new sequence
        var pages = -1;
        _sequences[name] = {
            name: name,
            routes: _.compact(_.map(routes, function(r){
                var route = _getRoute(r.name);
                // Check if it's an existing route or not
                return route ? route : false;
            })),
        };

        if( !_sequences[name].routes.length ) delete _sequences[name];
    };

    this.openSequence = function(name, page, data){
        if( _sequences[name] != undefined ) return false;

        _currentSequence = _sequences[name];

        var slider = document.createElement('div');
        slider.className = 'sequence_slider_wrapper';
        _.each( _currentSequence.routes, function(route, key){
            var data = key == page ? data : {};
            slider += Template[route.name](data);
        });

        document.getElementById('mobi_main').html = slider;
    };

    this.slideTo = function(page, data){

    };

    // Initializing iScrolls
    this.initScrolls = function(){
        initializeScrolls();
    };

    // It's the common function to display another page.
    this.go = function(routeName, params){
        var route = _getRoute(routeName);
        this.initScrolls();
        if( !route )
            throw new Error('This route does not exists.');

        _setMenuItemActive(params);

        window.history.pushState("", "MobiRouter", route.getPath(params));
        Session.set('actual_data', route.getData(params));
        Session.set('actual_page', routeName);
    };

    // Rendering actual content
    this.content = function(){
        var actual = Session.get('actual_page'),
            data = Session.get('actual_data'),
            route = _getRoute(actual);
        if( !route ) return '';

        return Template[route.template](data);
    };

    // Returns actual Route model
    this.currentRoute = function(){
        var actual = Session.get('actual_page');
        return _getRoute(actual);
    };

    // Rendering actual content
    this.contentTop = function(){
        return Template.mobi_contentTop();
    };

    // Rendering sidebar
    this.isSidebar = function(){
        return Template[_settings.sidebarTemplate]();
    };
    // Rendering sidebar
    this.sidebar = function(){
        return Template[_settings.sidebarTemplate]();
    };

    this.showSidebar = function(e){
        if(this.sidebarShown) return;
        console.log('Mobi-Router: show sidebar');
        var _this = this;

        $('#mobi_main').hardwareAnimate({translateX: this.sizes.sidebar.width}, 300, 'easeOutExpo', function(){}, function(){
            e.target.focus();
            if( _this.sizes.sidebar.width && (_this.sizes.router.width/_this.sizes.sidebar.width > 2.5) ) $('#mobi_main').animate({width: _this.sizes.main.width - _this.sizes.sidebar.width}, 150, 'easeInExpo', function(){
                refreshIscrolls();
            });
        });
        this.mainTranslateX += this.sizes.sidebar.width;
        this.sidebarShown = true;
    };

    this.hideSidebar = function(e){
        if(!this.sidebarShown) return;
        console.log('Mobi-Router: hide sidebar');
        var _this = this;

        $('#mobi_main').hardwareAnimate({translateX: -this.sizes.sidebar.width}, 300, 'easeOutExpo', function(){}, function(){
            e.target.focus();
            if( _this.sizes.sidebar.width && _this.sizes.router.width/_this.sizes.sidebar.width > 2.5 ) $('#mobi_main').animate({width: _this.sizes.main.width + _this.sizes.sidebar.width}, 300, 'easeOutExpo', function(){
                refreshIscrolls();
            });
        });
        this.mainTranslateX += -this.sizes.sidebar.width;
        this.sidebarShown = false;
    };

    this.prev = function(){} // -> global way to move to previous slide

    this.next = function(child){} //-> this one takes the child route to move to as a parameter

    this.getModel = function(){} //->u will notice i have a bunch of global functions like this: http://snapplr.com/xj4k which get a model based on a session-stored id. We need a consistent API for this.

    this.setModel = function(obj){} //-> on every page change, the model should be set to null unless explicitly set by the developer


    this.currentRoute = function(){} //-> this should return the object i made above, e.g: "{id: 'home', path: etc}

    this.currentTemplate = function(){} //-> quick global way to get current template

    this.getSlideStack = function(){} //-> returns an array of the slides on the current stack.

    this.getSlideStackSize = function(){} // -> this # is similar to our old slide_step #, but we shouldn't need it much anymore. we only need it to see if we can go back any farther. if the # == 1 then we cant go back any farther.


    // Testing functions
    this.getMap = function(){ return _routeMap; };
    this.getSequences = function(){ return _sequences; };

    return this;
};

MobiRouter = new Router;

Handlebars.registerHelper('MobiRouter', function(){
   return MobiRouter;
});

Route = function(name, params){

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
                newPath += '/' + (params[param] != undefined ? (_.isFunction(params[param]) ? params[param]() : params[param]) : 'undefined');
            }else
                newPath += param == '' ? '' : ('/'+param);
        });
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

    return this;
};


Function.prototype.duplicate = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for( key in this ) {
        temp[key] = this[key];
    }
    return temp;
};


applyAllScrolls = function() {
    console.log('Mobi-Router: apply all scrolls');
    for(name in Template) {
        if(name.substring(0,5) == 'page_' || name === 'mobi_sidebar') { //loop through all page_ templates and mobi_sidebar template
            (function() {
                if(Template[name].rendered != undefined) var oldRendered = Template[name].rendered.duplicate(); //clone original rendered function

                Template[name].rendered = function() {
                    var _this = this;
                    Meteor.setTimeout(function() {
                        setupIscroll(_this); //tack this on after the original rendered function ;)
                        if(oldRendered) oldRendered(); //call original rendered function
                    }, 0);
                };
            })();
        }
    }
};

initializeScrolls = _.once(applyAllScrolls);
