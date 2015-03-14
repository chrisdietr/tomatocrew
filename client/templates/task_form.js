
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

      setModalTitleText("Working. Focus!");
      setModalTimerTask(task.name);

      var onComplete = function(){
        setModalTitleText("Aaah, time to relax.");

        setTaskEditability(true);

        runModalTimer(3, function(){
          setModalTitleText("DONE")
        });
      };

      runModalTimer(2, onComplete);

      // Router.go('/working');
    });
    // Router.go('/working');
    // return false;
  }
});


// DFL TODO: Extract timer to separate class, handle html manipulation here

var setTaskEditability = function(editable) {
  if (editable) {
    document.getElementById("timerModalTaskField").removeAttribute('hidden');
    document.getElementById("timerModalTask").setAttribute('hidden', '');
  } else {
    document.getElementById("timerModalTaskField").setAttribute('hidden');
    document.getElementById("timerModalTask").removeAttribute('hidden');    
  }
}

var setModalTitleText = function(text) {
  document.getElementById("timerModalTitle").innerHTML = text;
}

var setModalTimerText = function(text) {
  document.getElementById("timerModalTime").innerHTML = text;
}

var setModalTimerTask = function(text) {
  document.getElementById("timerModalTask").innerHTML = text;
  document.getElementById("taskField").value = text;
}

var showTimerModalTaskField = function(text) {
  document.getElementById("timerModalTaskField").innerHTML = text;
}

var runModalTimer = function(timeleft, onComplete) {
  setModalTimerText(timeleft);
  $('#timerModal').modal();
  var counter=setInterval(timer, 1000); // milliseconds

  function timer() {
    --timeleft;
    if (timeleft <= 0) {
      clearInterval(counter);
      //counter ended, do something here
      setModalTimerText("");
      onComplete();

      return;
    }
    setModalTimerText(timeleft + " sec");
  }
};