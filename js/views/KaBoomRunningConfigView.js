var KaBoomConfigView = Backbone.View.extend({
    menuItems: ['kaboom', 'kaboom-config'],
    template: Handlebars.compile($("#kaboom-config-template").html()),
    events: {
        "click .save": "save",
        "click .revert": "revertToDefault",
        "click .cancel": "cancel",
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
        } else {
            change[target.name] = target.value;
        }
        console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + change[target.name]);
        this.model.set(change);
        this.markDirty();
    },
    cancel: function() {
        Dispatcher.trigger("flash", "info", "Changes cancelled");
        this.render();
    },
    save: function() {
        var _self = this;
        this.model.save().then(function() {
            _self.render();
            Dispatcher.trigger("flash", "success", "Running configuraiton saved");
        }, function(obj) {
            alert("There was a problem saving the Running Configuration");
        });
    },
    revertToDefault: function() {
        var _self = this;
        confirmAction("Revert Running Config to Default?", 
                      "Are you totally sure you want to permanently delete this Running Config and revert to default",
                      "CANCEL",
                      "Revert",
                      function() {
            _self.model.destroy().then(function() {
                this.model = new KaBoomConfigModel();                
                this.save();
                Dispatcher.trigger("flash", "success", "Running configuration reverted to default");
            }, function(obj) {
                alert("There was a problem deleting the topic configuration");
                console.log(obj);
            })
        });
    },
    markDirty: function() {
        this.dirty = true;
        Dispatcher.trigger("flash", "warning", "You have unsaved changes");
    }    
});