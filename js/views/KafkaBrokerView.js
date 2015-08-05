var KafkaBrokerView = Backbone.View.extend({
    menuItems: ['kafka', 'kafka-brokers'],
    template: Handlebars.compile($("#kafka-broker-list").html()),    
    initialize: function () {
        var _self = this;
        this.kafkaBrokers = new KafkaBrokerCollection();
        this.kafkaBrokers.fetch({success: function() {
            _self.render();
        }});
        return this;
    },
    render: function () {
        console.log(this.kafkaBrokers);
        this.$el.html(this.template({kafkaBrokers: this.kafkaBrokers.models}));
    }
});