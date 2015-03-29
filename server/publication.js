Meteor.publish('activeUsers', function() {
  return Meteor.users.find({},{fields: {_id: 1, username: 1, 'status.online' : 1}, limit: 50});
});

Meteor.publish('latestUserTask', function() {
  return Tasks.find({userId: this.userId},{sort: {submitted: -1}, limit: 100});
});

Meteor.publish('tasksList', function() {
  return Tasks.find({},{sort: {submitted: -1}, limit:50});
});

Meteor.publish('tasksListUsers', function() {
  var tasks = Tasks.find({},{sort: {submitted: -1}, limit:50}),
      tasksIds = _.pluck(tasks.fetch(), '_id'),
      userIds = _.pluck(tasks.fetch(), 'userId');
      userIds = _.unique(userIds);
      return Meteor.users.find({_id: {$in: userIds}}, {fields: {username: 1, userId: 1}, multi: true});
});
