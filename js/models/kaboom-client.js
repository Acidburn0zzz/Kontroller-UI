window.KaBoomClient = Backbone.Model.extend({
  urlRoot: "api/kaboom-client",
  defaults: {
    "id": null,
    "hostname":  "",
    "weight":  0,
    "load":  0,
    "targetLoad":  0
  }
});

window.KaBoomClientCollection = Backbone.Collection.extend({
  model: KaBoomClient,
  url: "api/kaboom-client"
});
