// import $ from 'jquery';
// import _ from 'underscore';
// import Backbone from 'backbone';

var TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.task = options.task;
    this.template = options.template;
  },

  render: function() {
    var html = this.template({task: this.task})
    this.$el.html(html);

    // Enable chained calls
    return this;
  }
});

// task_view.js
export default TaskView;
