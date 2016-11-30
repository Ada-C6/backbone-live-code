import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import TaskView from 'app/views/task_view';
import Task from 'app/models/task';

var TaskListView = Backbone.View.extend({
  initialize: function(options) {
    // Store a the full list of tasks
    // this.taskData = options.taskData;

    // Compile a template to be shared between the individual tasks
    this.taskTemplate = _.template($('#task-template').html());

    // Keep track of the <ul> element
    this.listElement = this.$('.task-list');

    //keeping track of our task models and cards
    this.modelList = [];
    // create a TaskView for each task, keeps track of cards
    this.cardList = [];


    options.taskData.forEach(function(task) {
    	this.addTask(task);

    }, this); // bind `this` so it's available inside forEach

      // Keep track of our form input fields
  this.input = {
    title: this.$('.new-task input[name="title"]'),
    description: this.$('.new-task input[name="description"]')
  }; 
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
  var task = this.getInput();

  // add a task!

  this.addTask(task);

  // Re-render the whole list, now including the new card
  this.render();

  // Clear the input form so the user can add another task
  this.clearInput();
}, //createTask end

addTask: function(rawTask) {
  	//creates new task from information
  var task = new Task(rawTask);
  // adds new task model to list
  this.modelList.push(task);

  var card = new TaskView( {
  	model: task,
  	template: thisTaskTemplate
  }); //end card

  this.cardList.push(card);
  }, //addTask end

// Build a task from the data entered in the .new-task form
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
} //clearInput end

});  //TaskListView end

// task_list_view.js
export default TaskListView;