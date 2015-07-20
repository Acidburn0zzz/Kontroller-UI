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

function removeModal(modal) {
    classie.remove(modal, 'md-show');
}

function confirmAction(title, message, cancelText, confirmText, actionCallBack) {    
    var template = Handlebars.compile($("#modal-confirm-action").html());    
    $("#modal-container").html(template({
        title: title, 
        message: message,
        cancelText: cancelText,
        confirmText: confirmText
    }));    
    //var overlay = document.getElementById('md-overlay');        
    var modal = document.getElementById("confirm-modal");
    var confirmBtn = modal.querySelector('.md-confirm');
    var cancelBtn = modal.querySelector('.md-cancel');
    
    classie.add(modal, 'md-show');
    
    //overlay.removeEventListener('click', removeModal(modal));
	//overlay.addEventListener('click', removeModal(modal));

    cancelBtn.addEventListener('click', function(event) {        
        event.stopPropagation();
		removeModal(modal);
    });
    
    confirmBtn.addEventListener('click', function(event) {        
        event.stopPropagation();
		removeModal(modal);
        actionCallBack();
    });
}