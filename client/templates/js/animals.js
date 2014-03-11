

/** animals HELPERS, EVENTS & CALLBACKS **/

Template.animals.isMammal = function(type){
    return type == 'mammal';
};
Template.animals.isBird = function(type){
    return type == 'bird';
};
Template.animals.isReptile = function(type){
    return type == 'reptile';
};


/** animals HELPERS, EVENTS & CALLBACKS **/

Template.mammals.bigAnimals = function(){
    var animals = [];
    _.each(Animals.mammals, function(m, id){
        if(_.isArray(m.weight) && m.weight[0] > 50 ){
            animals.push({
                title: m.name,
                icon: m.icon,
                action: function(){ MobiRouter.go('mammal-profile', {id: id}, true); },
            });
        }
    });
    return animals;
};

Template.mammals.smallAnimals = function(){
    var animals = [];
    _.each(Animals.mammals, function(m, id){
        if( !_.isArray(m.weight) || m.weight[0] < 50 ){
            animals.push({
                title: m.name,
                icon: m.icon,
                action: function(){ MobiRouter.go('mammal-profile', {id: id}, true); },
            });
        }
    });
    return animals;
};

Template.birds.canFly = function(){
    var animals = [];
    _.each(Animals.birds, function(b, id){
        if( b.canFly == true ){
            animals.push({
                title: b.name,
                icon: b.icon,
                action: function(){ MobiRouter.go('bird-profile', {id: id}, true); },
            });
        }
    });
    return animals;
};

Template.birds.canNotFly = function(){
    var animals = [];
    _.each(Animals.birds, function(b, id){
        if( b.canFly != true ){
            animals.push({
                title: b.name,
                icon: b.icon,
                action: function(){ MobiRouter.go('bird-profile', {id: id}, true); },
            });
        }
    });
    return animals;
};

Template.reptiles.aquatics = function(){
    var animals = [];
    _.each(Animals.reptiles, function(r, id){
        if( r.aquatic == true ){
            animals.push({
                title: r.name,
                icon: r.icon,
                action: function(){ MobiRouter.go('reptile-profile', {id: id}, true); },
            });
        }
    });
    return animals;
};

Template.reptiles.nonAquatics = function(){
    var animals = [];
    _.each(Animals.reptiles, function(r, id){
        if( r.aquatic != true ){
            animals.push({
                title: r.name,
                icon: r.icon,
                action: function(){ MobiRouter.go('reptile-profile', {id: id}, true); },
            });
        }
    });
    return animals;
};

/**  Handlebars **/

Handlebars.registerHelper('calcLength', function(length){
    var lengthString = '- no data -';
    if( length === false || length == undefined || (_.isArray(length) && length.length == 0) ){
        lengthString = '- no data -';
    }else if( _.isArray(length) ){
        if( length.length == 1 ){
            lengthString = 'about <b>'+length[0]+'</b> meters';
        }else{
            lengthString = 'from <b>'+length[0]+'</b> to <b>'+length[1]+'</b> meters';
        }
    }else if( _.isString(length) ){
        lengthString = 'about <b>'+length+'</b> meters';
    }

    return lengthString;
});


Handlebars.registerHelper('calcWeight', function(weight){
    var weightString = '- no data -';
    if( weight == undefined || weight === false || (_.isArray(weight) && weight.length == 0) ){
        weightString = '- no data -';
    }else if( _.isArray(weight) ){
        if( weight.length == 1 ){
            weightString = 'about <b>'+weight[0]+'</b> kilograms';
        }else{
            weightString = 'from <b>'+weight[0]+'</b> to <b>'+weight[1]+'</b> kilograms';
        }
    }else if( _.isString(weight) ){
        weightString = 'about <b>'+weight+'</b> kilograms';
    }

    return weightString;
});


Handlebars.registerHelper('mammalSize', function(weight){
    if( weight == undefined || weight === false || (_.isArray(weight) && weight.length == 0) ){
        return '- no data -';
    }else if( _.isArray(weight) ){
        if( weight[0] > 50 )
            return '<b>big</b> sized mammal';
        else
            return '<b>small</b> sized mammal';
    }else if( _.isString(weight) ){
        if( parseFloat(weight) > 50 )
            return '<b>big</b> sized mammal';
        else
            return '<b>small</b> sized mammal';
    }
});

Handlebars.registerHelper('boolYesNo', function(value){
    return Boolean(value) ? 'Yes' : 'No';
});
