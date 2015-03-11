Meteor.subscribe("userStatus");

Template.working.helpers ({
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

  latestTasks : function() { 
    var tasks = Tasks.find({},{sort: {submitted: -1}, limit:50}).fetch();
    console.log("tasks " + tasks);
    var tasksUserMap = tasks.map(
      function(task){
        // DFL TODO: This wastes a bunch of work as we repeatedly fetch the same user
        var user = Meteor.users.findOne({_id : task.userId});
        // console.log("user ._id .username" + user + ' ' + user._id + ' ' + user.username);
        return _.extend(task,{username:user.username});
      }
    );
    return tasksUserMap;
  }


});
