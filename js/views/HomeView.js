var HomeView = Backbone.View.extend({
    menuItems: [''],
    template: Handlebars.compile($("#home-template").html()),
    initialize: function () {
        this.render();
        return this;
    },
    render: function () {
        this.$el.html(this.template({greeting: "Welcome to kontroller, this is highly unusable"}));
    }
});