SyncedCron.add({
  name: 'Update pomodoro count for all users',
  schedule: function(parser) {
    return parser.text('every 3 hours');
  },
  job: function() {
    var pastWeekUsers = Meteor.users.find({"status.lastLogin.date": {$gt: new Date(moment().subtract(1, 'week'))}});
    pastWeekUsers.forEach(function(user){
        Tasks.updateUserPomodoroCount(user._id);
    });
  }
});


Meteor.startup(function() {
  SyncedCron.start();
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
