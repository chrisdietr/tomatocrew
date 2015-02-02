Template.working.helpers ({
  usersOnline : function() { return Meteor.users.find().fetch() }
  // usersOnline : function() { return Meteor.users.find({ "status.online": true }).fetch() }
});

Template.userPill.helpers ({
  labelClass : function() { return this.username }

});