Template.taskForm.events({ 
  'submit form': function(e) {
    e.preventDefault();

    console.log("Form submitted");

    var task = {
      name : $(e.target).find('[name=task]').val()
    }

    Meteor.call('taskInsert', task, function(error, result) { 
      // display the error to the user and abort
      if (error) {
        return alert(error.reason);        
      }

      $('#timerModal').modal();

      // Router.go('/working');
      // Router.go('postPage', {_id: result._id});
    });
    // Router.go('/working');
    // return false;
  }
});

