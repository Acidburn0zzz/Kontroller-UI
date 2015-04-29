Handlebars.registerPartial('kaboomRunningConfigForm', $("#kaboomRunningConfigForm").html());

Handlebars.registerHelper('checkedBoxFromBool', function(bool) {
    if (bool == true) {
        return "checked"
    }
});

/*
var oldSaveFunction = Backbone.Model.prototype.save;
Backbone.Model.prototype.save = function() {
    var returnedValue = oldSaveFunction.apply(this, arguments),
        deferred = new $.Deferred();

    if(_.isBoolean(returnedValue)) {
        deferred.reject();
        return deferred.promise();
    }

    return returnedValue;
}*/


/*
 * The view manager has a single function, loadView(), that accepts an
 * element ID as well as a function that instantiates the view.  Note
 * that newElementId must not contain the # prefix as it's created
 * with vanilla javascript whereas the element Id used for the 'el'
 * attribute when instantiating the view must be prefixed with # as
 * Backbone.View requires it.
 *
 * loadView() removes any existing views which un-registers any event
 * bindings, and removes the view's element from the DOM.  It then
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
    }
});

var appRouter = new AppRouter();
Backbone.history.start();