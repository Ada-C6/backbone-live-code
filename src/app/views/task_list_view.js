import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import TaskView from 'app/views/task_view';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Store a the full list of tasks
    this.taskData = options.taskData;

    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Keep track of the <ul> element
    this.listElement = this.$('.task-list');

    // Create a TaskView for each task
    this.cardList = [];
    this.taskData.forEach(function(task) {
      var card = new TaskView({
        task: task,
        template: this.taskTemplate
      });
      this.cardList.push(card);
    }, this); // bind `this` so it's available inside forEach

      // Keep track of our form input fields
  this.input = {
    title: this.$('.new-task input[name="title"]'),
    description: this.$('.new-task input[name="description"]')
  };
  },

  render: function() {
    // Make sure the list in the DOM is empty
    // before we start appending items
    this.listElement.empty();

    // Loop through the data assigned to this view
    this.cardList.forEach(function(card) {
      // Cause the task to render
      card.render();

      // Add that HTML to our task list
      this.listElement.append(card.$el);
    }, this);

    return this; // enable chained calls
  },

    events: {
    'click .clear-button': 'clearInput'
  },

  clearInput: function(event) {

  this.input.title.val('');
  this.input.description.val('');
}

});

// task_list_view.js
export default TaskListView;