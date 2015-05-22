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