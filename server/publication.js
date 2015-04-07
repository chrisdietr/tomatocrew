Meteor.publish('activeUsers', function() {
  return Meteor.users.find({},
    {fields: {username: 1, 'status.online': 1}, sort: {'status.lastLogin.date': -1}, limit: 50}
  );
});

Meteor.publish('latestUserTask', function() {
  return Tasks.find({userId: this.userId},{sort: {submitted: -1}, limit: 100});
});

Meteor.publish('tasksList', function() {
  return Tasks.find({},{sort: {submitted: -1}, limit:50});
});

Meteor.publish('tasksListUsers', function() {
  var tasks = Tasks.find({}, {sort: {submitted: -1}, limit: 50});
  var userIds = _.unique(_.pluck(tasks.fetch(), 'userId'));
  return Meteor.users.find({_id: {$in: userIds}},
    {fields: {username: 1, userId: 1, 'profile.avatarUrl': 1}}
  );
});
