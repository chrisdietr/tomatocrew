Template.working.helpers({

  latestTasks: function() {
    var tasks = Tasks.find({}, {sort: {submitted: -1}, limit: 10});
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
    var users = Meteor.users.find({}, {sort: {'status.lastLogin.date': -1}, limit: 100}).fetch();
    return users;
    //var userTaskMap = users.map(
    //  function(user) {
    //    var topTask = Tasks.findOne({userId: user._id}, {sort: {submitted: -1}});
    //    return {'user': user, 'task': topTask}
    //  }
    //);
    //return userTaskMap;
  }
});
