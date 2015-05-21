Handlebars.registerHelper('drawMoveUp', function(filter) {
    var disabled = '';
    if(filter.number == 1) {
        disabled = ' disabled ';
    }
    return '<button value="' + filter.number + '" type="button" class="btn btn-default btn-sm filterUp" ' + disabled +'>' +
        '<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></button>';
});

Handlebars.registerHelper('drawMoveDown', function(filter, numFilters) {
    var disabled = '';
    if(filter.number == numFilters) {
        disabled = ' disabled ';
    }
    return '<button value="' + filter.number + '" type="button" class="btn btn-default btn-sm filterDown" ' + disabled +'>' +
        '<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>' +
        '</button>';
});

var KaBoomTopicEditView = Backbone.View.extend({
    menuItems: ['kaboom', 'kaboom-topics'],
    template: Handlebars.compile($("#kaboom-topic-edit-template").html()),
    events: {
        "click .addFilter": "addFilter",
        "click .filterUp": "filterUp",
        "click .filterDown": "filterDown",
        "click .cancel": "render",
        "click .save": "save",
        "click .filterRemove": "filterRemove",
        "change input": "change"
    },
    initialize: function() {
        var _self = this;
        if (!this.topicConfigs) {
            this.topicConfigs = new KaBoomTopicConfigCollection();
        }
        this.currentTopicId = currentTopicId;
        this.topicConfigs.fetch({success: function() {
            _self.dirty = false;
            _self.render();
        }});
        return this;
    },
    render: function() {
        //console.log(this.getTopic());
        var _self = this;
        $(this.el).html(this.template({
            topics: this.topicConfigs.models,
            currentTopic: _self.getTopic()
        }));
        $("#" + this.currentTopicId).addClass("active");
    },
    getTopic: function() {
        return this.topicConfigs.get(this.currentTopicId);
    },
    change: function(event) {
        var target = event.target;
        var newValue = target.value;
        if (target.type && target.type === 'checkbox') {
            if (target.checked) {
                newValue = 'true';
            } else {
                newValue = 'false';
            }
        }
        var change = {};
        var regex = /^filterSet\[(\d+)]\[(.*?)]/g
        var match = regex.exec(target.name);
        if (match) {
            var index = match[1] - 1;
            var name = match[2];
            change[name] = newValue;
            this.getTopic().attributes.filterSet[index].set(change);
        } else {
            change[target.name] = newValue;
            this.getTopic().set(change);
        }
        //console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + newValue);
        this.dirty = true;
        //this.render();
    },
    filterUp: function(event) {
        var index1 = event.target.value - 1;
        var index2 = event.target.value - 2;
        this.swapFilters(index1, index2);
        this.dirty = true;
        this.render();
    },
    filterDown: function(event) {
        var index1 = event.target.value - 1;
        var index2 = event.target.value;
        this.swapFilters(index1, index2);
        this.dirty = true;
        this.render();
    },
    filterRemove: function(event) {
        var index = event.target.value - 1;
        this.getTopic().attributes.filterSet.splice(index, 1);
        this.dirty = true;
        this.render();
    },
    swapFilters: function(index1, index2) {
        var filters = this.getTopic().attributes.filterSet;
        var obj1 = filters[index1];
        var obj2 = filters[index2];
        var num1 = obj1.attributes.number;
        var num2 = obj2.attributes.number;
        filters[index1] = obj2;
        filters[index2] = obj1;
        filters[index1].attributes.number = num1;
        filters[index2].attributes.number = num2;
    },
    addFilter: function() {
        this.getTopic().attributes.filterSet.push(
            new KaBoomTopicFilter({number: this.getTopic().attributes.filterSet.length + 1}));
        this.dirty = true;
        this.render();
    },
    save: function() {
        var _self = this;
        this.getTopic().save().then(function() {
            _self.topicConfigs = new KaBoomTopicConfigCollection();
            _self.topicConfigs.fetch({success: function() {
                console.log("we've fetched after save")
                _self.dirty = false;
                _self.render();

            }});
        }, function(obj) {
            alert("There was a problem saving the topic configuration");
            console.log(obj);
        });
    }
});