var KaBoomTopicShowView = Backbone.View.extend({
    menuItems: ['kaboom', 'kaboom-topics'],
    template: Handlebars.compile($("#kaboom-topic-show-template").html()),
    refreshCurrentTopic: function() {
        if (typeof this.currentTopicId !== "undefined") {
            var _self = this;
            this.kaboomTopics.forEach(function(element) {
                if (element.attributes.topicName == _self.currentTopicId) {
                    _self.currentTopic = element;
                }
            });
        }
    },
    initialize: function() {
        var _self = this;
        if (!this.kaboomTopics) {
            this.kaboomTopics = new KaBoomTopicCollection();
        }
        if (typeof currentTopicId !== "undefined") {
            this.currentTopicId = currentTopicId;            
        }
        this.kaboomTopics.fetch({success: function() {
            _self.refreshCurrentTopic();            
            _self.render();            
        }});
        return this;
    },
    render: function() {        
        var _self = this;
        $(this.el).html(this.template({
            kaboomTopics: this.kaboomTopics.models,
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