// import $ from 'jquery';
// import _ from 'underscore';
import Backbone from 'backbone';

var TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;

	//listen to our model, re-render whatever it changes
    this.listenTo(this.model, 'change', this.render);
  }, //initialize end

  render: function() {
    var html = this.template({task: this.model.attributes});
    this.$el.html(html);

    //re-bind events, since html all new
    this.delegateEvents();

    // Enable chained calls
    return this;
  }, //render end

  events: {
    "click .complete-button": "completeHandler",
    "click .delete-button": "deleteHandler"
  },

  toggleComplete: function() {
  	this.model.toggleComplete();
  },

    deleteHandler: function() {
    // Show a popup box asking the user for confirmation
    if (window.confirm("Are you sure you want to delete this task?")) {
      this.model.destroy();
    }
  },

  completeHandler: function() {
  	console.log("completeHandler called!");
  	this.model.toggleComplete();
  }

});  //TaskView end

// task_view.js
export default TaskView;
