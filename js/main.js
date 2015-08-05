/*
 * The view manager has a single function, loadView(), that accepts an
 * element ID as well as a function that instantiates the view.  Note
 * that newElementId must not contain the # prefix as it's created
 * with vanilla javascript whereas the element Id used with the 'el'
 * parameter when instantiating the view must be prefixed with # (as
 * Backbone.View requires it).
 *
 * loadView() removes any existing views which un-registers any event
 * bindings then removes the view's element from the DOM.  It then
 * creates a new element inside the content div, sets the id for the
 * to-be-created view, and sets the current view to the value returne   d
 * by the viewGenerator function.
 */

var ViewManager = {
    currentView: null,
    loadView: function(newElementId, viewGenerator) {        
        $("#flash-messages").html("");
        this.currentView != null && this.currentView.remove();
        var viewContainer = document.createElement("div");
        viewContainer.id = newElementId;
        document.getElementById('content-container').appendChild(viewContainer);
        viewContainer.setAttribute("class", "container");
        this.currentView = viewGenerator();
        AppMenu.refresh(this.currentView.menuItems);
    }
}

var AppRouter = Backbone.Router.extend({    
    currentView : null,
    routes: {
        '': 'homeRoute',
        'kaboom': 'kaboomRoute',
        'kaboom-config': 'kaboomConfigRoute',
        'kaboom-topic-configs': "kaboomTopicConfigsRoute",
        'kaboom-topic-configs/:id'	: "kaboomTopicEditRoute",
        'kafka-brokers': 'kafkaBrokerListRoute',
        'kafka-topics': 'kafkaTopicListRoute',
        'kafka-topics/:id'	: "kafkaTopicShowRoute",
        'kaboom-topics': 'kaboomTopicListRoute',
        'kaboom-topics/:id'	: "kaboomTopicShowRoute",
    },
    homeRoute: function () {
        ViewManager.loadView("home-content", function() {
            return new HomeView({el: "#home-content"});
        });
    },
    kaboomRoute: function () {
        ViewManager.loadView("kaboom-content", function() {
            return new KaBoomView({el: "#kaboom-content"});
        });
    },
    kaboomConfigRoute: function () {
        ViewManager.loadView("kaboom-config-content", function() {
            return new KaBoomConfigView({el: "#kaboom-config-content"});
        });
    },
    kaboomTopicConfigsRoute: function () {
        ViewManager.loadView("kaboom-topic-list-content", function() {
            currentTopicId = undefined;
            return new KaBoomTopicEditView({
                el: "#kaboom-topic-list-content"
            });
        });
    },
    kaboomTopicEditRoute: function (id) {
        ViewManager.loadView("kaboom-topic-edit-content", function() {
            var _self = this;
            _self.currentTopicId = id;
            return new KaBoomTopicEditView({
                el: "#kaboom-topic-edit-content",
                currentTopicId: _self.currentTopicId
            });
        });
    },
    kafkaBrokerListRoute: function () {
        ViewManager.loadView("kafka-brokers-content", function() {
            return new KafkaBrokerView({el: "#kafka-brokers-content"});
        });
    },
    kafkaTopicListRoute: function () {
        ViewManager.loadView("kafka-topics-content", function() {
            return new KafkaTopicShowView({el: "#kafka-topics-content"});
        });
    },
    kafkaTopicShowRoute: function (id) {
        ViewManager.loadView("kafka-topics-content", function() {
            var _self = this;
            _self.currentTopicId = id;
            return new KafkaTopicShowView({
                el: "#kafka-topics-content",
                currentTopicId: _self.currentTopicId
            });
        });
    },
    kaboomTopicListRoute: function () {
        ViewManager.loadView("kaboom-topics-content", function() {
            currentTopicId = undefined;
            return new KaBoomTopicShowView({el: "#kaboom-topics-content"});
        });
    },
    kaboomTopicShowRoute: function (id) {
        ViewManager.loadView("kaboom-topics-content", function() {
            var _self = this;
            _self.currentTopicId = id;
            return new KaBoomTopicShowView({
                el: "#kaboom-topics-content",
                currentTopicId: _self.currentTopicId
            });
        });
    },
    hashChange : function(evt) {
        if(this.cancelNavigate) {
            evt.stopImmediatePropagation();
            this.cancelNavigate = false;
            return;
        }
        if(ViewManager.currentView && ViewManager.currentView.dirty) {
            var dialog = confirm("You have unsaved changes. To stay on the page, press cancel. To discard changes and leave the page, press OK");
            if(dialog == true)
                return;
            else {
                evt.stopImmediatePropagation();
                this.cancelNavigate = true;
                window.location.href = evt.originalEvent.oldURL;
            }
        }
    },
    beforeUnload : function() {
        if(ViewManager.currentView && ViewManager.currentView.dirty)
            return "You have unsaved changes. If you leave or reload this page, your changes will be lost.";
    }

});

var appRouter = new AppRouter();
$(window).on("hashchange", appRouter.hashChange);
$(window).on("beforeunload", appRouter.beforeUnload);
Dispatcher = _.extend({}, Backbone.Events);
var flashView = new FlashMessage({el: "#flashed-msg-template"});
Backbone.history.start();