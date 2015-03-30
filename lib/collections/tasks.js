Tasks = new Mongo.Collection('tasks');


Tasks.activeTask = function() {
  var tasks = Tasks.activeTasks();
  return tasks[0];
};

Tasks.activeTasks = function() {
  return Tasks.find({userId:Meteor.userId(), endDate: {$gt: new Date()}}, {sort: {submitted: -1}}).fetch();
};

Tasks.cancelActiveTasks = function() {
  // DFL TODO: Make sure Date() calls on client / server match up. (unsycned clock, timezones, etc)
  var nowDate = new Date();
  var tasks = Tasks.find({userId:Meteor.userId(), endDate: {$gt: nowDate}},{$set: {endDate: nowDate}});
  var tasksIds = _.pluck(tasks.fetch(), '_id');
  var numCanceled = 0;
  for (var i = 0; i < tasksIds.length; ++i) {
    Tasks.update(tasksIds[i], {$set: {endDate: nowDate}});
    ++numCanceled;
  }
  console.log(numCanceled + " active tasks canceled");
};

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
