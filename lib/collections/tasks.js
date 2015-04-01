Tasks = new Mongo.Collection('tasks');


Tasks.activeTask = function() {
  var tasks = Tasks.activeTasks();
  return tasks[0];
};

Tasks.activeTasks = function() {
  return Tasks.find({userId:Meteor.userId(), endDate: {$gt: new Date()}}, {sort: {submitted: -1}}).fetch();
};

var _cancelActiveTasks = function (date) {
  // DFL TODO: Make sure Date() calls on client / server match up. (unsynced clock, timezones, etc)
  var nowDate = date ? date : new Date();
  var tasks = Tasks.find({userId: Meteor.userId(), endDate: {$gt: nowDate}}, {$set: {endDate: nowDate}});
  var tasksIds = _.pluck(tasks.fetch(), '_id');
  var numCanceled = 0;
  // DFL TODO: Use single call again for update, now that this is a method
  for (var i = 0; i < tasksIds.length; ++i) {
    Tasks.update(tasksIds[i], {$set: {endDate: nowDate}});
    ++numCanceled;
  }
  console.log(numCanceled + " active tasks canceled");
};

Meteor.methods({
  cancelActiveTasks: _cancelActiveTasks,
  taskInsert: function(taskAttributes, duration) {
    check(Meteor.userId(), String);
    check(taskAttributes, {
      name: String,
    });
    _cancelActiveTasks();
    var taskStartDate = new Date();
    var msMinute= 60 * 1000;
    var taskEndDate = new Date(taskStartDate.getTime() + duration * msMinute);

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
