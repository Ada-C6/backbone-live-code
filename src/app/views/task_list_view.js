import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import TaskView from 'app/views/task_view';

import Task from 'app/models/task';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Keep track of the <ul> element
    this.listElement = this.$('.task-list');

    // We'll keep track of a list of task models and a list
    // of task views.
    this.cardList = [];

    // Process each task
    this.model.forEach(function(task) {
      this.addTask(task);
    }, this); // bind `this` so it's available inside forEach

    // Keep track of our form input fields
    this.input = {
      title: this.$('.new-task input[name="title"]'),
      description: this.$('.new-task input[name="description"]')
    };

        // Re-render the whole list when the Collection changes
    this.listenTo(this.model, 'update', this.render);

    // When a Model is removed from the Collection, remove the
    // corresponding card from our list.
    this.listenTo(this.model, 'remove', this.removeTask);

  }, //initialize end

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
  }, //render end

  events: {
    'submit .new-task': 'createTask',
    'click .clear-button': 'clearInput'
  },

  createTask: function(event) {
    // Normally a form submission will refresh the page.
    // Suppress that behavior.
    event.preventDefault();

    // Get the input data from the form and turn it into a task
    var rawTask = this.getInput();
    var task = this.model.add(rawTask);

    // Create a card
    this.addTask(task);

    // Re-render the whole list, now including the new card
    this.render();

    // Clear the input form so the user can add another task
    this.clearInput();
  }, //createTask end

  // Create a card for a task and add that card to our list of cards.
  addTask: function(task) {
    // Create a card for the new task
    var card = new TaskView({
      model: task,
      template: this.taskTemplate
    });

    // Add the card to our card list
    this.cardList.push(card);
  },  //addTask end

  // Build a raw task (not a model) from the data entered in the .new-task form
  getInput: function() {
    var task = {
      title: this.input.title.val(),
      description: this.input.description.val()
    };
    return task;
  }, //getInput end

  clearInput: function(event) {
    this.input.title.val('');
    this.input.description.val('');
  }, //clearInput end

  removeTask: function(task) {
    var filteredList = [];
    this.cardList.forEach(function(card) {
      if (card.model != task) {
        filteredList.push(card);
      }
    });
    this.cardList = filteredList;
  }

});  //TaskListView end


export default TaskListView;




