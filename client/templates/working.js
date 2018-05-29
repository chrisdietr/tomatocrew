Template.working.helpers({

  latestTasks: function() {
    var tasks = Tasks.find({finishReason: {$not: Tasks.FinishReason.CANCEL}}, {sort: {submitted: -1}, limit: 50});
    var userIds = _.unique(_.pluck(tasks.fetch(), 'userId'));
    var userObjects = Meteor.users.find({_id: {$in: userIds}},
      {fields: {username: 1, _id: 1, 'profile.avatarUrl': 1}}
    ).fetch();
    var userIdsNamesDict = {};
    var tasksUserMap;

    userObjects.map(function(userObj) {
      var avatar = userObj.profile ? userObj.profile.avatarUrl : '';
      userIdsNamesDict[userObj._id] = { username: userObj.username, avatarUrl: avatar};
    });

    tasksUserMap = tasks.map(function(task) {
      var userEntry = userIdsNamesDict[task.userId];
      return _.extend(task, {username: userEntry.username, avatarUrl: userEntry.avatarUrl});
    });

    return tasksUserMap;
  },

  latestUsers: function() {
    return Meteor.users.find({}, {sort: {'status.online': -1, 'profile.weeklyPomodoros': -1}, limit: 50}).fetch();
  }
});
