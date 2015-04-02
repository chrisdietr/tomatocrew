Template.timerModal.onRendered(function() {

  var checkActiveTask = function() {
    var task = Tasks.activeTask();
    if(task) {
      //setModalTitle("Working. Focus!");
      runModalTimer(task, onTimerComplete);
    } else {
      $('#timerModal').modal('hide');
      clearCountdownCounter();
    }
  }

  this.autorun(checkActiveTask);
});

Template.timerModal.events({
  'click #abort-task-btn': function(event, template) {
    clearCountdownCounter();
    Meteor.call('cancelActiveTasks', new Date(), function(error, result) {
      // display the error to the user and abort
      if (error) {
        return alert(error.reason);
      }
    });
  }
});

var onTimerComplete = function(){
  //setModalTitle("Done!");
  // DFL TODO: Break mode
  // runModalTimer(3, function(){
  //   setModalTitle("DONE")
  // });
};

// HTML Document Setters and Getters

var setModalTitle = function(text) {
  $('#modal-timer-title').html(text);
};

var setModalTimerText = function(text) {
  $('#modal-timer-time').html(text);
  $(document).attr("title", text);
};

var countdownCounter;

var clearCountdownCounter = function clearCountdownCounter() {
  if (countdownCounter) {
    Meteor.clearInterval(countdownCounter);
  }
};

var runModalTimer = function(task, onComplete) {

  if (task.endDate < new Date()) {
    console.error("Tried running timer for date in the past");
    return;
  }
  var timeleft = Timer.secondsTilDate(task.endDate);

  clearCountdownCounter();
  countdownCounter = Meteor.setInterval(timer, 1000); // milliseconds

  $('#timerModal').modal('show');
  setModalTitle(task.name);
  setModalTimerText(Timer.counterForSeconds(timeleft));

  function timer() {
    --timeleft;
    console.log('tick');
    if (timeleft <= 0) {
      clearCountdownCounter();
      timeleft = 0;
      setModalTimerText(Timer.counterForSeconds(timeleft));
      onComplete();
      return;
    }

    setModalTimerText(Timer.counterForSeconds(timeleft));
  }
};


