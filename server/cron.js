SyncedCron.add({
  name: 'Update pomodoro count for all users',
  schedule: function(parser) {
    return parser.text('every 3 hours');
  },
  job: function() {
    Tasks.updateAllUserTasks();
  }
});


Meteor.startup(function() {
  SyncedCron.start();
  Tasks.updateAllUserTasks();
});


// Get Pomdoro count for each User (can probably optimise above loop with this)
//
// db.tasks.aggregate([
//     { $match: {"finishReason":  {$ne: "CANCEL"}}
//     },
//     { $group: {
//             _id: {userId: "$userId"},
//             count: {$sum: 1}
//         }
//     },
// ])
