// src/app/models/task.js

import Backbone from 'backbone';

var Task = Backbone.Model.extend({
  defaults: {
    title: "Unknown Task",
    description: "placeholder description"
  },

  initialize: function() {
    console.log("Created new task with title " + this.title);
  }, //initialize end


//if task is complete, mark complete, if not, mark incomplete

  toggleComplete: function() {
  	var newStatus = !this.get('complete');
  	this.set('complete', newStatus);
  } //toggleComplete end
}); //Task end

export default Task;