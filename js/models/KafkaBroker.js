var KafkaBrokerModel = Backbone.Model.extend({
    urlRoot: "api/kafka-broker",
});

var KafkaBrokerCollection = Backbone.Collection.extend({
    model: KafkaBrokerModel,
    url: "api/kafka-broker"
});