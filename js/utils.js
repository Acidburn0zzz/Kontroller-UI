function isFunction(possibleFunction) {
    return typeof(possibleFunction) === typeof(Function);
}

function enableTextInput(element) {
    element.readOnly = false;
    element.className = "enabledTextInput";
}

function disableTextInput(element) {
    element.readOnly = true;
    element.className = "disabledTextInput";
}

function textInputKeypress(element, event) {
    if (event.which == 13 || event.keyCode == 13) {
        disableTextInput(element);
    }
}

function enableCheckbox(element, divId) {
    var div = document.getElementById(divId);
    div.className = "enabledTextInput";
    element.readOnly = false;
    element.onclick = function() {
        return true;
    };
}

function disableCheckbox(element, divId) {
    var div = document.getElementById(divId);
    div.className = "disabledTextInput";
    element.readOnly = true;
    element.onclick = function() {
        return false;
    }
}

function recursiveToJSON(json) {
    for(var attr in json) {
        if (json[attr] instanceof Array) {
            json[attr] = recursiveToJSON(json[attr]);
        }
        if((json[attr] instanceof Backbone.Model) || (json[attr] instanceof Backbone.Collection)) {
            json[attr] = json[attr].toJSON();
        }
    }
    return json;
}