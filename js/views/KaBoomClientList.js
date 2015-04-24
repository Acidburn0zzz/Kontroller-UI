window.KaBoomClientListView = Backbone.View.extend({

    tagName:'ul',

    initialize:function () {
        this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (kaboomClient) {
            $(self.el).append(new KaBoomClientItemView({model:kaboomClient}).render().el);
        });
    },

    render:function (eventName) {
        _.each(this.model.models, function (kaboomClient) {
            $(this.el).append(new KaBoomClientListItemView({model:kaboomClient}).render().el);
        }, this);
        return this;
    }
});

window.KaBoomClientListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.template = _.template(tpl.get('kaboom-client-list-item'));
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});
