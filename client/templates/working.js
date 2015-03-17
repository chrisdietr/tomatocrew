Meteor.subscribe("activeUsers");
Meteor.subscribe("userStatus");
Meteor.subscribe("tasksList");

Template.working.helpers ({

  latestTasks : function() { 
    var tasks = Tasks.find({},{sort: {submitted: -1}, limit:50}),
        tasksIds = _.pluck(tasks.fetch(), '_id'),
        userIds = _.unique(_.pluck(tasks.fetch(), 'userId')),
        userObjects = Meteor.users.find({_id: {$in: userIds}}, {fields: {username: 1, _id: 1}, multi: true}).fetch(),
        userIdsNamesDict = {};

        userObjects.map( function(userObj) {
          userIdsNamesDict[userObj._id] = userObj.username;
        });
        // console.log(userIdsNamesDict);

        tasksUserMap = tasks.map( function(task) {
          return _.extend(task, {username: userIdsNamesDict[task.userId]});
        });
        // console.log(tasksUserMap);

        return tasksUserMap;
  },

  latestUsers : function() { 
    var users = Meteor.users.find({},{limit:50}).fetch(); 
    //   var users = Meteor.users.find({ "status.online": true }).fetch(); 
    var userTaskMap = {};
    userTaskMap = users.map(
      function(user){
        topTask = Tasks.findOne({userId: user._id}, {sort: {submitted: -1}});
        return { 'user':user, 'task':topTask}
      }
    );
    return userTaskMap;
  },



});
