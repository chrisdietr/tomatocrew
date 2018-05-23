Tasks = new Mongo.Collection('tasks');

Tasks.FinishReason = Object.freeze({
  CANCEL : 'CANCEL',
  COMPLETE : 'COMPLETE',
  TIMEOUT : 'TIMEOUT',
});

Tasks.activeTask = function() {
  var tasks = Tasks.activeTasks();
  return tasks[0];
};

Tasks.activeTasks = function() {
  return Tasks.find({userId: Meteor.userId(), endDate: {$gt: new Date()}}, {sort: {submitted: -1}}).fetch();
};


Meteor.methods({
  updateActiveTasks: function(finishReason, date) {
    // DFL TODO: Make sure Date() calls on client / server match up. (unsynced clock, timezones, etc)
    var nowDate = date ? date : new Date();
    var numUpdated = Tasks.update(
      {userId: Meteor.userId(), endDate: {$gt: nowDate}},
      {$set: {endDate: nowDate, finishReason:finishReason}});
    return numUpdated;
  },
  updateNumPomodoros: function(quantity) {
      var numPoms = Tasks.find({userId: Meteor.user()._id, finishReason: {$ne: 'CANCEL'}}).count();
      console.log(numPoms);
      Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.numPomodoros": numPoms }})
  },
  cancelActiveTasks: function(date) {
    var numCanceled = Meteor.call('updateActiveTasks', Tasks.FinishReason.CANCEL, date);
    console.log(numCanceled + " active tasks canceled");
  },
  completeActiveTasks: function(date) {
    var numCompleted = Meteor.call('updateActiveTasks', Tasks.FinishReason.COMPLETE, date);
    console.log(numCompleted + " active tasks completed");
  },
  taskInsert: function(taskAttributes, duration) {
    check(Meteor.userId(), String);
    check(taskAttributes, {
      name: String
    });
    Meteor.call('cancelActiveTasks');
    var taskStartDate = new Date();
    var msMinute = 60 * 1000;
    var taskEndDate = new Date(taskStartDate.getTime() + duration * msMinute);

    var task = _.extend(taskAttributes, {
      userId: Meteor.userId(), 
      submitted: taskStartDate,
      endDate: taskEndDate
    });

    var taskId = Tasks.insert(task)

    return {
      _id: taskId
    }; 
  }
});
