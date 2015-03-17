Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true }, { fields: {'status.online' : 1} });
});

// DFL TODO: For some reason we're not getting all user -> username back 
// is this a publication issue, or an issue in the template? 
//
// OLD: we also (may) need to publish a safe list of users other than us


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
