Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  taskInsert: function(taskAttributes, duration) {
    check(Meteor.userId(), String);
    check(taskAttributes, {
      name: String,
    });
    
    var taskStartDate = new Date();
    var taskEndDate = new Date();
    taskEndDate = new Date(taskEndDate.setTime(taskStartDate.getTime() + (duration * 60 * 1000)));

    var task = _.extend(taskAttributes, {
      userId: Meteor.userId(), 
      submitted: taskStartDate,
      endDate: taskEndDate,
    });

    var taskId = Tasks.insert(task)

    return {
      _id: taskId
    }; 
  }
});
