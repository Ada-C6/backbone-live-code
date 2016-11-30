// import $ from 'jquery';
// import _ from 'underscore';
import Backbone from 'backbone';

var TaskView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;
  }, //initialize end

  render: function() {
    var html = this.template({task: this.model.attributes})
    this.$el.html(html);

    // Enable chained calls
    return this;
  } //render end
});  //TaskView end

// task_view.js
export default TaskView;
