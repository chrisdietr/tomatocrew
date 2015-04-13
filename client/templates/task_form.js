Template.taskForm.events({
  'submit form': function(event,  template) {
    event.preventDefault();
    console.log("Form submitted");

    var task = {
      name : template.$('[name=task]').val()
    }

    var duration = template.$('#task-duration option:selected').val();

    Meteor.call('taskInsert', task, duration, function(error, result) {
      // display the error to the user and abort
      if (error) {
        return alert(error.reason);
      }
    });
  }
});


Template.taskForm.onRendered(function (){
  $('.modal').on('hidden.bs.modal', function () {
    $('[name=task]').select();
  })
});

