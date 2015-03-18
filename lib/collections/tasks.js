Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  taskInsert: function(taskAttributes) {
    check(Meteor.userId(), String);
    check(taskAttributes, {
      name: String,
      intervalDuration: String
    });
    
    var user = Meteor.user();
    var startDate = new Date();
    var endDate = new Date(startDate);
    // DFL TODO: Make interval variabl
    endDate = new Date(endDate.setSeconds(endDate.getSeconds() + 300));
    var task = _.extend(taskAttributes, {
      userId: user._id, 
      submitted: startDate,
      finishTime: endDate,
    });

    var taskId = Tasks.insert(task)

    return {
      _id: taskId
    }; 
  }
});
