var KafkaView = Backbone.View.extend({
    menuItems: ['kafka'],
    template: Handlebars.compile($("#kafka-template").html()),
    initialize: function () {
        this.render();
        return this;
    },
    render: function () {
        this.$el.html(this.template({content: "kafka is a great event ingest technology"}));
    }
});