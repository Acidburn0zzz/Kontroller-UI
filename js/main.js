<<<<<<< HEAD
// Custom structure to represent the structure of
// the app and it's various links/pages/routes and
// to help with generating the templates/marking
// menu items as active, etc...

var AppMenu = AppMenu || {};

AppMenu.activeClassName = 'active';
AppMenu.inactiveClassName = '';
AppMenu.menuItemIdPrefix = '#headerMenu_'; //Includes the prefix # for jQuery DOM access
AppMenu.activeItems = [];

AppMenu.menuItems = [
    {'link': "", 'title': "Kontroller"},
    {'link': "kafka", 'title': "Kafka"},
    {'link': "kaboom", 'title': "KaBoom", 'subMenu': [
        {'link': "kaboom-config", 'title': "Running Config"},
        {'link': "kaboom-topics", 'title': "Topics"},
        {'link': "kaboom-assignments", 'title': "Assignments"}
    ]}
];

AppMenu.refresh = function(newActiveItems) {
    AppMenu.activeItems.forEach(function (prevItem) {
        $(AppMenu.menuItemIdPrefix + prevItem).removeClass(AppMenu.activeClassName);
    });
    newActiveItems.forEach(function (activeItem) {
        $(AppMenu.menuItemIdPrefix + activeItem).addClass(AppMenu.activeClassName);
    });
    AppMenu.activeItems = newActiveItems;
};

var headerTemplate = Handlebars.compile($("#header-nav-bar").html());
$("#header").html(headerTemplate(AppMenu));
console.log($("#header").html());

var HomeView = Backbone.View.extend({
    menuItems: [''],
    template: Handlebars.compile($("#home-template").html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template({greeting: "Welcome to kontroller, this is highly unusable"}));
    }
});

var KaBoomView = Backbone.View.extend({
    menuItems: ['kaboom'],
    template: Handlebars.compile($("#kaboom-template").html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template({content: "kaboom is a custom component that takes writes events from kafka to hdfs"}));
    }
});

var KaBoomConfigView = Backbone.View.extend({
    menuItems: ['kaboom', 'kaboom-config'],
    template: Handlebars.compile($("#kaboom-config-template").html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template({content: "This is the place where you configure kaboom"}));
    }
});

var KafkaView = Backbone.View.extend({
    menuItems: ['kafka'],
    template: Handlebars.compile($("#kafka-template").html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template({content: "kafka is a great event ingest technology"}));
    }
});

var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'homeRoute',
        'kaboom': 'kaboomRoute',
        'kaboom-config': 'kaboomConfigRoute',
        'kafka': 'kafkaRoute'
    },
    homeRoute: function () {
        var homeView = new HomeView();
        AppMenu.refresh(homeView.menuItems);
        $("#content").html(homeView.el);
    },
    kaboomRoute: function () {
        var kaboomView = new KaBoomView();
        AppMenu.refresh(kaboomView.menuItems);
        $("#content").html(kaboomView.el);
    },
    kaboomConfigRoute: function () {
        var kaboomConfigView = new KaBoomConfigView();
        AppMenu.refresh(kaboomConfigView.menuItems);
        $("#content").html(kaboomConfigView.el);
    },
    kafkaRoute: function () {
        var kafkaView = new KafkaView();
        AppMenu.refresh(kafkaView.menuItems);
        $("#content").html(kafkaView.el);
    }
});

var appRouter = new AppRouter();
Backbone.history.start();
