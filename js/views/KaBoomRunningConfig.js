var KaBoomConfigModel = Backbone.Model.extend({
    url: "api/kaboom-config"
});

var KaBoomConfigView = Backbone.View.extend({
    menuItems: ['kaboom', 'kaboom-config'],
    template: Handlebars.compile($("#kaboom-config-template").html()),
    events: {
        "click .save": "save",
        "click .cancel": "render",
        "change input": "change"
    },
    initialize: function() {
        this.model = new KaBoomConfigModel();
        this.render();
        return this;
    },
    render: function() {
        var _self = this;
        this.deferred = this.model.fetch();
        this.dirty = false;
        this.deferred.done(function(data) {
            _self.model.set(data);
            $(_self.el).html(_self.template({runningConfig: _self.model.attributes}));
        });
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
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + change[target.name]);
        this.model.set(change);
        this.dirty = true;
    },
    save: function() {
        var _self = this;
        this.model.save().then(function() {
            _self.render();
        }, function(obj) {
            alert("There was a problem saving the Running Configuration");
            console.log(obj);
        });
    }
});