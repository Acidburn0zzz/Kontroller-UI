var KaBoomTopicConfigModel = Backbone.Model.extend({
    urlRoot: "api/kaboom-topic-config"
});

var KaBoomTopicConfigCollection = Backbone.Collection.extend({
    model: KaBoomTopicConfigModel,
    url: "api/kaboom-topic-config"
});

var KaBoomTopicFilter = Backbone.Model.extend({
    defaults: {
        name: '<new filter>',
        type: 'STRING_MATCH',
        filterIntentionIsToMatch: true,
        filter: '<match me>',
        duration: 3600,
        directory: '<SOME DIR>'
    }
});

var KaBoomTopicListView = Backbone.View.extend({
    menuItems: ['kaboom', 'kaboom-topics'],
    template: Handlebars.compile($("#kaboom-topic-template").html()),
    initialize: function() {
        var _self = this;
        if (!appRouter.topicConfigs) {
            appRouter.topicConfigs = new KaBoomTopicConfigCollection();
        }
        appRouter.topicConfigs.fetch({success: function() {
            _self.render();
        }});

        return this;
    },
    render: function() {
        $(this.el).html(this.template({
            topics: appRouter.topicConfigs.models}
        ));
    }
});