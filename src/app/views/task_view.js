import Backbone from 'backbone';

var TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;

    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    console.log(this.model.attributes);
    var html = this.template({task: this.model.attributes});
    this.$el.html(html);

    // Re-attach DOM event listeners to our brand-spankin-new HTML
    this.delegateEvents();

    // Enable chained calls
    return this;
  },

  events: {
    "click .complete-button": "completeHandler",
    "click .delete-button": "deleteHandler",
    "dblclick": "editHandler"
  },

  completeHandler: function(event) {
    console.log("completeHandler called!");
    this.model.toggleComplete();
  },

  deleteHandler: function(event) {
    console.log("deleteHandler called!");
    if (window.confirm("Are you sure you want to delete this task?")) {
      console.log("going to delete it!");
      this.model.destroy();
    }
  },

  editHandler: function(event) {
    console.log("editHandler called");
    this.trigger('edit', this.model);
  }
});

export default TaskView;
