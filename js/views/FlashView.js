var FlashMessage = Backbone.View.extend({
    initialize: function() {
        FlashMessage.template = Handlebars.compile($(this.el).html());
        FlashMessage.typeToStrongMap = {
            success: "Success", 
            info: "Attention",
            warning: "Warning",
            danger: "Caution"
        };
        Dispatcher.bind('flash', this.flash);
        Dispatcher.bind('flash_custom', this.flash_custom);
    },
    flash: function(type, message) {        
        $("#flash-messages").html(FlashMessage.template({
            type: type,
            strong_message: FlashMessage.typeToStrongMap[type],
            message: message}));
    },
    flash_custom: function(type, strong_message, message) {
        $("#flash-messages").html(FlashMessage.template({
            type: type, 
            strong_message: strong_message, 
            message: message}));
    }
});