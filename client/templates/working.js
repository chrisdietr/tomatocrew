Template.working.helpers({

  latestTasks: function() {
    var tasks = Tasks.find({}, {sort: {submitted: -1}, limit: 50});
    var userIds = _.unique(_.pluck(tasks.fetch(), 'userId'));
    var userObjects = Meteor.users.find({_id: {$in: userIds}}, {fields: {username: 1, _id: 1}, multi: true}).fetch();
    var userIdsNamesDict = {};
    var tasksUserMap;

    userObjects.map(function(userObj) {
      userIdsNamesDict[userObj._id] = userObj.username;
    });

    tasksUserMap = tasks.map(function(task) {
      return _.extend(task, {username: userIdsNamesDict[task.userId]});
    });

    return tasksUserMap;
  },

  latestUsers: function() {
    var users = Meteor.users.find({}, {sort: {'status.lastLogin.date': -1}, limit: 50}).fetch();
    var userTaskMap = users.map(
      function(user) {
        var topTask = Tasks.findOne({userId: user._id}, {sort: {submitted: -1}});
        return {'user': user, 'task': topTask}
      }
    );
    return userTaskMap;
  }
});
