var KaBoomTopicEditView = Backbone.View.extend({
    menuItems: ['kaboom', 'kaboom-topics'],
    template: Handlebars.compile($("#kaboom-topic-edit-template").html()),
    events: {
        "click .newTopic": "newTopic",
        "click .addFilter": "addFilter",
        "click .filterUp": "filterUp",
        "click .filterDown": "filterDown",
        "click .cancel": "cancelEdit",
        "click .save": "save",
        "click .destroy": "destroy",
        "click .filterRemove": "filterRemove",
        "change input": "change"
    },
    refreshCurrentTopic: function() {
        if (typeof this.currentTopicId !== "undefined") {
            this.currentTopic = this.topicConfigs.get(this.currentTopicId);
            // Filter numbers are a construct of the UI only 
            // the actual object model uses an array so 
            // artifically populate the number attribute 
            for (var i=0; i < this.currentTopic.attributes.filterSet.length; i++) {
                this.currentTopic.attributes.filterSet[i].attributes.number = i + 1;
            }
        }
    },
    initialize: function() {
        var _self = this;
        if (!this.topicConfigs) {
            this.topicConfigs = new KaBoomTopicConfigCollection();
        }
        if (typeof currentTopicId !== "undefined") {
            this.currentTopicId = currentTopicId;
        }
        this.topicConfigs.fetch({success: function() {
            _self.refreshCurrentTopic();
            _self.dirty = false;
            _self.render();
        }});
        return this;
    },
    render: function() {        
        var _self = this;
        $(this.el).html(this.template({
            topics: this.topicConfigs.models,
            currentTopic: _self.getTopic()
        }));
        if (this.currentTopicId) {
            $("#" + this.currentTopicId).addClass("active");
        }        
    },
    cancelEdit: function() {
        delete currentTopic;
        delete currentTopicId;
        window.location.href = '#kaboom-topics';
    },
    getTopic: function() {
        if (this.currentTopic) {
            return this.currentTopic;
        }
    },
    newTopic: function() {
        this.currentTopic = new KaBoomTopicConfigModel();
        this.render();
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
        this.dirty = true;
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
        var filters = this.getTopic().attributes.filterSet;
        filters.splice(index, 1);
        for (var i=index; i < filters.length; i++) {            
            filters[i].attributes.number--;
        }
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
    destroy: function() {
        var _self = this;
        this.getTopic().destroy().then(function() {
            _self.cancelEdit();
        }, function(obj) {
            alert("There was a problem deleting the topic configuration");
            console.log(obj);
        });
    },
    save: function() {
        var _self = this;
        this.getTopic().save().then(function() {
            _self.topicConfigs = new KaBoomTopicConfigCollection();
            _self.topicConfigs.fetch({success: function() {
                _self.refreshCurrentTopic();
                _self.dirty = false;
                _self.render();
            }});
        }, function(obj) {
            alert("There was a problem saving the topic configuration");
            console.log(obj);
        });
    }
});