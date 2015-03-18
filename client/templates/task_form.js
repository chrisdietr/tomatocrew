
Template.taskForm.events({ 
  'submit form': function(e) {
    e.preventDefault();
    console.log("Form submitted");

    var task = {
      name : $(e.target).find('[name=task]').val(),
      intervalDuration : $(e.target).find('[name=intervalDuration]').val()
    }

    Meteor.call('taskInsert', task, function(error, result) { 
      // display the error to the user and abort
      if (error) {
        return alert(error.reason);        
      }

      // DFL TODO: Bind the timer setup to a reactive Variable instead of invoking directly
      dummyTimerSetup(task.intervalDuration);
    });
  }
});

