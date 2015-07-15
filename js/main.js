Handlebars.registerPartial('editable-ro-checkbox',
    $("#editable-ro-checkbox").html());

Handlebars.registerPartial('editable-ro-text-input',
    $("#editable-ro-text-input").html());

Handlebars.registerPartial('kaboom-running-config-form-template',
    $("#kaboom-running-config-form-template").html());

Handlebars.registerPartial('kaboom-topic-list-template',
    $("#kaboom-topic-list-template").html());

Handlebars.registerPartial('kaboom-topic-edit-form-template',
    $("#kaboom-topic-edit-form-template").html());

Handlebars.registerPartial('kaboom-topic-filter-form-template',
    $("#kaboom-topic-filter-form-template").html());

Handlebars.registerPartial('topic-filter-mgmt-butons',
    $("#topic-filter-mgmt-butons").html());

Handlebars.registerHelper('checkedBoxFromBool', function(bool) {
    if (bool == true) {
        return "checked"
    }
});

Handlebars.registerHelper("debug", function(optionalValue) {
    console.log("Current Context");
    console.log("===============");
    console.log(this);
    if (optionalValue) {
        console.log("Value");
        console.log("=====");
        console.log(optionalValue);
    }
});

/*
 * BackBone (by default doesn't inherently call toJSON() on attributes
 * that are other models.  I'm not sure why.. However, if we override
 * the toJSON() function and add a little introspection then we should
 * be able to achieve what we want
 */
/*

Backbone.Model.prototype.toJSON = function() {
    var json = _.clone(this.attributes);
    for(var attr in json) {
        if((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
            json[attr] = json[attr].toJSON();
            console.log("we're overriding the toJSON on attr=" + attr);
        }
    }
    console.log("here's the full JSON: " + json);
    return json;
};
*/

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
 * to-be-created view, and sets the current view to the value returned
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
        'kaboom-topics': "kaboomTopicListRoute",
        "kaboom-topics/:id"	: "kaboomTopicEditRoute",
        'kafka': 'kafkaRoute'
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
    kaboomTopicListRoute: function () {
        ViewManager.loadView("kaboom-topic-list-content", function() {
            return new KaBoomTopicEditView({el: "#kaboom-topic-list-content"});
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
    kafkaRoute: function () {
        ViewManager.loadView("kafka-content", function() {
            return new KafkaView({el: "#kafka-content"});
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