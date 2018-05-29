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

    var taskId = Tasks.insert(task);

    if (Meteor.isServer){
      var callingUserId = Meteor.userId();
      Meteor.defer(function(){Tasks.scheduleUserPomodoroUpdate(callingUserId, taskEndDate)});
    }

    return {
      _id: taskId
    };
  }
});



Tasks.weekStartDate = function weekStartDate() {
  return new Date(moment().utc().startOf('week').subtract(6, 'hours'));
};

Tasks.updateUserPomodoroCount = function (userId) {
  var totalPomodoros = Tasks.find( {userId: userId, finishReason: { $ne: 'CANCEL'}} ).count();
  var weeklyPomodoros = Tasks.find( {userId: userId, finishReason: { $ne: 'CANCEL'}, endDate: {$gt: Tasks.weekStartDate()}} ).count();
  Meteor.users.update({_id: userId}, {$set: {"profile.totalPomodoros": totalPomodoros, "profile.weeklyPomodoros": weeklyPomodoros }});
};


Tasks.scheduleUserPomodoroUpdate = function (userId, runDate) {
  // Schedule completion job

  SyncedCron.add({
    name: 'Update pomodoro count for ' + userId + ' on ' + runDate,
    schedule: function(parser) {
      return parser.recur().on(runDate).fullDate();
    },
    job: function() {
      console.log ("updating user pomodoro count");
      Tasks.updateUserPomodoroCount(userId);
    }
  });
}



