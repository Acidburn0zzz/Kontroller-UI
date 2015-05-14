Handlebars.registerHelper('drawMoveUp', function(filter) {
    var disabled = '';
    if(filter.number == 1) {
        disabled = ' disabled ';
    }
    return '<button value="' + filter.number + '" type="button" class="btn btn-default btn-sm filterUp" ' + disabled +'>' +
        '<span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span> Move Up</button>';
});

Handlebars.registerHelper('drawMoveDown', function(filter, numFilters) {
    var disabled = '';
    if(filter.number == numFilters) {
        disabled = ' disabled ';
    }
    return '<button value="' + filter.number + '" type="button" class="btn btn-default btn-sm filterDown" ' + disabled +'>' +
        '<span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>' +
        ' Move Down' +
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
        "change input": "change"
    },
    initialize: function() {
        var _self = this;
        if (!this.topicConfigs) {
            this.topicConfigs = new KaBoomTopicConfigCollection();
        }
        this.currentTopicId = currentTopicId;
        this.topicConfigs.fetch({success: function() {
            _self.render();
        }});
        return this;
    },
    render: function() {
        var _self = this;
        this.dirty = false;
        $(_self.el).html(_self.template({
            topics: this.topicConfigs.models,
            currentTopic: this.topicConfigs.get(this.currentTopicId)
        }));
        $("#" + this.currentTopicId).addClass("active");
    },
    getTopic: function() {
        return this.topicConfigs.get(this.currentTopicId);
    },
    change: function(event) {
        var target = event.target;
        var change = {};
        //var match = target.name.match(/^filterSet\[(\d+)]\[(.*?)]/g);

        var regex = /^filterSet\[(\d+)]\[(.*?)]/g
        var match = regex.exec(target.name);
        if (match) {
            var index = match[1] - 1;
            var name = match[2];
            change[name] = target.value;
            var filter = this.getTopic().attributes.filterSet[index];
            filter.set(change);
        }
        else {
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
            this.getTopic().set(change);
        }
        this.render();
    },
    filterUp: function(event) {
        var index1 = event.target.value - 1;
        var index2 = event.target.value - 2;
        this.swapFilters(index1, index2);
        this.render();
    },
    filterDown: function(event) {
        var index1 = event.target.value - 1;
        var index2 = event.target.value;
        this.swapFilters(index1, index2);
        this.render();
    },
    swapFilters: function(index1, index2) {
        var filters = this.getTopic().attributes.filterSet;
        var obj1 = filters[index1];
        var obj2 = filters[index2];
        var num1 = obj1.attributes.number;
        var num2 = obj2.attributes.number;
        console.log("swapping index " + index1 + " (number: " + num1
            + " for index " + index2 + " (number " + num2 + ")");
        filters[index1] = obj2;
        filters[index2] = obj1;

        filters[index1].attributes.number = num1;
        filters[index2].attributes.number = num2;
    },
    addFilter: function(event) {
        this.getTopic().attributes.filterSet.push(
            new KaBoomTopicFilter({number: this.getTopic().attributes.filterSet.length + 1}));
        this.render();
    }
});