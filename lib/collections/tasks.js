Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  taskInsert: function(taskAttributes) {
    check(Meteor.userId(), String);
    check(taskAttributes, {
      name: String
    });
    
    var user = Meteor.user();
    var task = _.extend(taskAttributes, {
      userId: user._id, 
      submitted: new Date()
    });

    var taskId = Tasks.insert(task)

    return {
      _id: taskId
    }; 
  }
});
