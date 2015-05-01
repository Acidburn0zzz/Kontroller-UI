Handlebars.registerPartial('kaboomRunningConfigForm', $("#kaboomRunningConfigForm").html());

Handlebars.registerHelper('checkedBoxFromBool', function(bool) {
    if (bool == true) {
        return "checked"
    }
});

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
        this.currentView != null && this.currentView.remove();
        var viewContainer = document.createElement("div");
        viewContainer.id = newElementId;
        document.getElementById('content').appendChild(viewContainer);
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
        ViewManager.loadView("kaboomConfig-content", function() {
            return new KaBoomConfigView({el: "#kaboomConfig-content"});
        });
    },
    kafkaRoute: function () {
        ViewManager.loadView("kafka-content", function() {
            return new KafkaView({el: "#kafka-content"});
        });
    },
    hashChange : function(evt) {
        if(this.cancelNavigate) { // cancel out if just reverting the URL
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
Backbone.history.start();