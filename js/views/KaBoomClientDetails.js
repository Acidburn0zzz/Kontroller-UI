window.KaBoomClientDetails = Backbone.View.extend({

  tagName: "div", // Not required since 'div' is the default if no el or tagName specified

  initialize: function() {
    this.template = _.template(tpl.get('kaboom-client-details'));
    this.model.bind("change", this.render, this);
  },

  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  events: {
    "change input": "change",
    "click .save": "saveKaBoomClient",
    "click .delete": "deleteKaBoomClient"
  },

  change: function(event) {
    var target = event.target;
    console.log('changing ' + target.id + ' from: ' + target.defaultValue + ' to: ' + target.value);
    // You could change your model on the spot, like this:
    // var change = {};
    // change[target.name] = target.value;
    // this.model.set(change);
  },

  saveKaBoomClient: function() {
    this.model.set({
      hostname: $('#hostname').val(),
      weight: $('#weight').val(),
      load: $('#load').val(),
      targetLoad: $('#targetLoad').val()
    });
    if (this.model.isNew()) {
      var self = this;
      app.kaboomClientList.create(this.model, {
        success: function() {
          app.navigate('kaboom-client/'+self.model.id, false);
        }
      });
    } else {
      this.model.save();
    }
    return false;
  },

  deleteKaBoomClient: function() {
    this.model.destroy({
      success: function() {
        alert('KaBoom Client deleted successfully');
        window.history.back();
      }
    });
    return false;
  }

});
