Tasks = new Mongo.Collection('tasks');


Tasks.activeTask = function() {
  var tasks = Tasks.activeTasks();
  return tasks[0];
};

Tasks.activeTasks = function() {
  return Tasks.find({userId:Meteor.userId(), endDate: {$gt: new Date()}}, {sort: {submitted: -1}}).fetch();
}

Tasks.cancelActiveTasks = function() {
  var nowDate = new Date();
  var numCanceled = Tasks.update({userId:Meteor.userId(), endDate: {$gt: nowDate}},{$set: {endDate: nowDate}});
  console.log(numCanceled + " active tasks canceled");
}

Meteor.methods({
  taskInsert: function(taskAttributes, duration) {
    check(Meteor.userId(), String);
    check(taskAttributes, {
      name: String,
    });

    Tasks.cancelActiveTasks();
    
    var taskStartDate = new Date();
    var taskEndDate = new Date(taskStartDate.getTime() + duration * 60 * 1000);

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
