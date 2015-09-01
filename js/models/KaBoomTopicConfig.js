var KaBoomTopicConfigModel = Backbone.Model.extend({
    urlRoot: "api/kaboom-topic-config",
    toJSON: function () {
        var clone = _.clone(this.attributes);
        return recursiveToJSON(clone);
    },
    initialize: function (response) {
        var _self = this;
        _.each(response, function (value) {
            if (value instanceof Array) {
                var filters = [];
                value.forEach(function (filter) {
                    filters.push(new KaBoomTopicFilter(filter));
                });
                _self.set({"filterSet": filters});
            }
        });
        return this;
    },
    defaults: {
        "id": "New Topic",
        "hdfsRootDir": "/path/to/files",
        "proxyUser": "username",
        "defaultDirectory": "data",        
        "filterSet": []
    }

});

var KaBoomTopicConfigCollection = Backbone.Collection.extend({
    model: KaBoomTopicConfigModel,
    url: "api/kaboom-topic-config"
});