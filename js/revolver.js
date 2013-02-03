//Defines the basic data model for the UI

Lobbyist = Backbone.Model.extend({
    idAttribute: "nodeId",
    initialize: function(){
    }
});

Lobby = Backbone.Collection.extend({
    model: Lobbyist
});


Senator = Backbone.Model.extend({
    idAttribute: "nodeId",
    defaults: {
        "totalFunds":  0,
    },
    initialize: function(){
    }
});



Bill = Backbone.Model.extend({
    initialize: function(){
    }
});

Congress = Backbone.Collection.extend({
    model: Senator
});




