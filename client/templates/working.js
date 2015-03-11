Meteor.subscribe("userStatus");

Template.working.helpers ({
  latestUsers : function() { 
    var users = Meteor.users.find().fetch(); 
    var userTaskMap = {};
    userTaskMap = users.map(
      function(user){
        topTask = Tasks.findOne({userId: user._id}, {sort: {submitted: -1}});
        return { 'user':user, 'task':topTask}
      }
    );
    return userTaskMap;
  },

  // usersOnline : function() { 
  //   var users = Meteor.users.find({ "status.online": true }).fetch(); 
  //   var userTaskMap = {};
  //   userTaskMap = users.map(
  //     function(user){
  //       topTask = Tasks.findOne({userId: user._id}, {sort: {submitted: -1}});
  //       return { 'user':user, 'task':topTask}
  //     }
  //   );
  //   return userTaskMap;
  // },

  latestTasks : function() { 
    var tasks = Tasks.find({},{sort: {submitted: -1}}).fetch();
    console.log("tasks " + tasks);

    // DFL TODO:
    // get unique user IDs from tasks
    // find username for each 
    // build retval with username + task

    return tasks;
  }

});
