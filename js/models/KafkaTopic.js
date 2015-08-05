var KafkaTopicModel = Backbone.Model.extend({
    urlRoot: "api/kafka-topic",
});

var KafkaTopicCollection = Backbone.Collection.extend({
    model: KafkaTopicModel,    
    url: "api/kafka-topic"
});