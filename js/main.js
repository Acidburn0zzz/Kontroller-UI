Backbone.View.prototype.close = function () {
  console.log('Closing view ' + this);
  if (this.beforeClose) {
    this.beforeClose();
  }
  this.remove();
  this.unbind();
};

var AppRouter = Backbone.Router.extend({

  initialize: function() {
    $('#header').html( new HeaderView().render().el );
  },

  routes: {
    ""			: "list",
    "kaboom-client/:id"	: "KaBoomClientDetails"
  },

  list: function() {
    this.before();
  },

  KaBoomClientDetails: function(id) {
    this.before(function() {
      var kaboomClient = app.KaBoomClientList.get(id);
      app.showView( '#content', new KaBoomClientDetails({model: kaboomClient}) );
    });
  },

  /*newWine: function() {
    this.before(function() {
      app.showView( '#content', new WineView({model: new Wine()}) );
    });
  },
*/
  showView: function(selector, view) {
    if (this.currentView)
      this.currentView.close();
    $(selector).html(view.render().el);
    this.currentView = view;
    return view;
  },

  before: function(callback) {
    if (this.KaBoomClientList) {
      if (callback) callback();
    } else {
      this.KaBoomClientList = new KaBoomClientCollection();
      this.KaBoomClientList.fetch({success: function() {
        $('#sidebar').html( new KaBoomClientListView({model: app.KaBoomClientList}).render().el );
        if (callback) callback();
      }});
    }
  }

});

tpl.loadTemplates(['header', 'kaboom-client-list-item', 'kaboom-client-details'], function() {
  app = new AppRouter();
  Backbone.history.start();
});
