// Useful for checking if callback functions are defined or not

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

function enableCheckbox(element, divId) {
    var div = document.getElementById(divId);
    div.className = "enabledTextInput";
    element.readOnly = false;
    element.onclick = function() {
        console.log("checked: " + !element.checked);
        //element.checked = !element.checked;
        return true;
    };
    //element.className = "enabledTextInput";
}

function disableCheckbox(element, divId) {
    var div = document.getElementById(divId);
    div.className = "disabledTextInput";
    element.readOnly = true;
    element.onclick = function() {
        return false;
    }
}
