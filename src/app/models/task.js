// src/app/models/task.js

import Backbone from 'backbone';

var Task = Backbone.Model.extend({
  defaults: {
    title: "Unknown Task",
    description: "placeholder description"
  },
  initialize: function() {
    console.log("Created new task with title " + this.title);
  }; //initialize end

}); //Task end



export default Task;