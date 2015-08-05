Handlebars.registerPartial('editable-ro-checkbox',
    $("#editable-ro-checkbox").html());

Handlebars.registerPartial('editable-ro-text-input',
    $("#editable-ro-text-input").html());

Handlebars.registerPartial('kaboom-running-config-form-template',
    $("#kaboom-running-config-form-template").html());

Handlebars.registerPartial('kaboom-editTopic-list-template',
    $("#kaboom-editTopic-list-template").html());

Handlebars.registerPartial('kaboom-editTopic-edit-form-template',
    $("#kaboom-editTopic-edit-form-template").html());

Handlebars.registerPartial('kaboom-topic-filter-form-template',
    $("#kaboom-topic-filter-form-template").html());

Handlebars.registerPartial('topic-filter-mgmt-butons',
    $("#topic-filter-mgmt-butons").html());

Handlebars.registerPartial('kafka-broker-template',
    $("#kafka-broker-template").html());

Handlebars.registerPartial('kafka-topic-list-template',
    $("#kafka-topic-list-template").html());

Handlebars.registerPartial('kafka-topic-showTopic-template',
    $("#kafka-topic-showTopic-template").html());

Handlebars.registerPartial('kaboom-topic-list-template',
    $("#kaboom-topic-list-template").html());

Handlebars.registerPartial('kaboom-topic-showTopic-template',
    $("#kaboom-topic-showTopic-template").html());

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