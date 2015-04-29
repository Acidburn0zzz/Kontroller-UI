var KaBoomView = Backbone.View.extend({
    menuItems: ['kaboom'],
    template: Handlebars.compile($("#kaboom-template").html()),
    initialize: function () {
        this.render();
        return this;
    },
    render: function () {
        this.$el.html(this.template({content: "kaboom is a custom component that takes writes events from kafka to hdfs"}));
    }
});