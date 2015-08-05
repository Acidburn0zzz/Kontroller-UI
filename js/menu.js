var AppMenu = AppMenu || {};

AppMenu.activeClassName = 'active';
AppMenu.inactiveClassName = '';
AppMenu.menuItemIdPrefix = '#headerMenu_'; //Includes the prefix # for jQuery DOM access
AppMenu.activeItems = [];

AppMenu.menuItems = [
    {'link': "", 'title': "Kontroller"},
    {'link': "kafka", 'title': "Kafka", 'subMenu': [
        {'link': "kafka-brokers", 'title': "Brokers"},
        {'link': "kafka-topics", 'title': "Topics"}
    ]},
    {'link': "kaboom", 'title': "KaBoom", 'subMenu': [
        {'link': "kaboom-config", 'title': "Running Config"},
        {'link': "kaboom-topic-configs", 'title': "Topic Config"},
        {'link': "kaboom-topics", 'title': "Assignments"}
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

var headerTemplate = Handlebars.compile($("#header-nav-bar-template").html());
$("#header-container").html(headerTemplate(AppMenu));