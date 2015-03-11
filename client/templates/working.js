Meteor.subscribe("userStatus");

Template.working.helpers ({
  // usersOnline : function() { return Meteor.users.find().fetch() }
  usersOnline : function() { 
    var users = Meteor.users.find({ "status.online": true }).fetch(); 
    // Tasks.find()
    // console.log("users " + users);

    var userTaskMap = {};
    userTaskMap = users.map(
      function(user){
        // console.log("user " + user);
        // console.log("userId " + user._id);
        topTask = Tasks.findOne({userId: user._id}, {sort: {submitted: -1}});
        // console.log("topTask.name " + topTask.name);
        return { 'user':user, 'task':topTask}
      }
    );

    // console.log("userTaskMap ");
    // console.log(userTaskMap);
    // userTaskMap.map ( function(doc) { console.log(doc)});
    // Tasks.findOne({userId: 'yTDMbtm5zBmADGTiX'}, {sort: {submitted: -1}});

    // return users;
    return userTaskMap;
  }
});
