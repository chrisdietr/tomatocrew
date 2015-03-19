Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  taskInsert: function(taskAttributes) {
    check(Meteor.userId(), String);
    check(taskAttributes, {
      name: String,
      intervalDuration: String
    });
    
    var taskStartDate = new Date();
    var taskEndDate = new Date(taskStartDate);
    // DFL TODO: Make interval variable
    taskEndDate = new Date(taskEndDate.setSeconds(taskEndDate.getSeconds() + 60));

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
