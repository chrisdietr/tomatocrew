
Template.taskForm.events({ 
  'submit form': function(e) {
    e.preventDefault();
    console.log("Form submitted");

    var task = {
      name : $(e.target).find('[name=task]').val()
    }

    var duration = $(e.target).find('[name=intervalDuration]').val();

    Meteor.call('taskInsert', task, duration, function(error, result) { 
      // display the error to the user and abort
      if (error) {
        return alert(error.reason);        
      }
    });
  }
});

