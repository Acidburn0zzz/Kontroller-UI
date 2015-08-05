var KafkaTopicShowView = Backbone.View.extend({
    menuItems: ['kafka', 'kafka-topics'],
    template: Handlebars.compile($("#kafka-topic-show-template").html()),
    refreshCurrentTopic: function() {
        if (typeof this.currentTopicId !== "undefined") {
            var _self = this;
            this.kafkaTopics.forEach(function(element) {
                if (element.attributes.name == _self.currentTopicId) {
                    _self.currentTopic = element;
                    console.log("Found current topic: " + element.attributes.name);
                }
            });
        }
    },
    initialize: function() {
        var _self = this;
        if (!this.kafkaTopics) {
            this.kafkaTopics = new KafkaTopicCollection();
        }
        if (typeof currentTopicId !== "undefined") {            
            this.currentTopicId = currentTopicId;            
        }
        this.kafkaTopics.fetch({success: function() {
            _self.refreshCurrentTopic();            
            _self.render();            
        }});
        return this;
    },
    render: function() {        
        var _self = this;
        $(this.el).html(this.template({
            kafkaTopics: this.kafkaTopics.models,
            currentTopic: _self.getTopic()
        }));
        if (this.currentTopicId) {
            $("#" + this.currentTopicId).addClass("active");
        }        
    },
    getTopic: function() {
        if (this.currentTopic) {
            return this.currentTopic;
        }
    }
});