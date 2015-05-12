var KaBoomTopicEditView = Backbone.View.extend({
    menuItems: ['kaboom', 'kaboom-topics'],
    template: Handlebars.compile($("#kaboom-topic-edit-template").html()),
    events: {
        "click .addFilter": "addFilter",
        "click .cancel": "render",
        "change input": "change"
    },
    initialize: function() {
        var _self = this;
        if (!appRouter.topicConfigs) {
            appRouter.topicConfigs = new KaBoomTopicConfigCollection();
        }
        this.currentTopicId = currentTopicId;
        appRouter.topicConfigs.fetch({success: function() {
            _self.render();
        }});

        return this;
    },
    render: function() {
        var _self = this;
        this.dirty = false;
        $(_self.el).html(_self.template({
            topics: appRouter.topicConfigs.models,
            currentTopic: appRouter.topicConfigs.get(_self.currentTopicId)
        }));
        $("#" + this.currentTopicId).addClass("active");
    },
    addFilter: function(event) {
        alert("adding a filter");
    },
    change: function(event) {
        var target = event.target;
        var change = {};
        if (target.type && target.type === 'checkbox') {
            if (target.checked) {
                change[target.name] = 'true';
            }
            else {
                change[target.name] = 'false';
            }
        }
        else {
            change[target.name] = target.value;
        }
        console.log('changing ' + target.id
            + ' from: ' + target.defaultValue
            + ' to: ' + change[target.name]);
        this.model.set(change);
        this.dirty = true;
    }
});