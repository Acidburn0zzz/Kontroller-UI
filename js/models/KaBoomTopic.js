var KaBoomTopicModel = Backbone.Model.extend({
    urlRoot: "api/kaboom-topic",
});

var KaBoomTopicCollection = Backbone.Collection.extend({
    model: KaBoomTopicModel,
    url: "api/kaboom-topic"
});