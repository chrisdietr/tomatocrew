var countdownCounter;
var notification;

Template.timerModal.onRendered(function() {

  var checkActiveTask = function() {
    var task = Tasks.activeTask();
    if(task) {
      //setModalTitle("Working. Focus!");
      runModalTimer(task, onTimerComplete);
    } else {
      $('#timerModal').modal('hide');
      resetCountdownTimer();
    }
  }

  this.autorun(checkActiveTask);
});


Template.timerModal.events({
  'click #cancel-task-btn': function(event, template) {
    resetCountdownTimer();
    Meteor.call('cancelActiveTasks', new Date(), function(error, result) {
      // display the error to the user and abort
      if (error) {
        return alert(error.reason);
      }
    });
  },
  'click #complete-task-btn': function(event, template) {
    resetCountdownTimer();
    notification.close();
    Meteor.call('completeActiveTasks', new Date(), function(error, result) {
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
  Meteor.call('updateNumPomodoros');
};

// HTML Document Setters and Getters

var setModalTitle = function(text) {
  $('#modal-timer-title').html(text);
};

var setModalTimerText = function(text) {
  $('#modal-timer-time').html(text);
  document.title = text;
};

var setCompleteButtonStatus = function(active) {
  if (active) {
    $('#cancel-task-btn').removeClass("timer-btn-active").addClass("timer-btn-inactive");
    $('#complete-task-btn').removeClass("timer-btn-inactive").addClass("timer-btn-active");
  } else {
    $('#complete-task-btn').removeClass("timer-btn-active").addClass("timer-btn-inactive");
    $('#cancel-task-btn').removeClass("timer-btn-inactive").addClass("timer-btn-active");
  }
};


var resetCountdownTimer = function resetCountdownTimer() {
  if (countdownCounter) {
    Meteor.clearInterval(countdownCounter);
  }
  document.title = '';
};

var runModalTimer = function(task, onComplete) {
  var snd;
  Notification.requestPermission();
  if (task.endDate < new Date()) {
    console.error("Tried running timer for date in the past");
    return;
  }
  var timeleft = Timer.secondsTilDate(task.endDate);

  resetCountdownTimer();
  countdownCounter = Meteor.setInterval(timer, 1000); // milliseconds

  $('#timerModal').modal('show');
  setModalTitle(task.name);
  setModalTimerText(Timer.counterForSeconds(timeleft));
  setCompleteButtonStatus(false);

  function timer() {
    snd = snd ? snd : new Audio("sounds-882-solemn.mp3");
    timeleft = Timer.secondsTilDate(task.endDate);
    //console.log('tick');
    if (timeleft <= 0) {
      resetCountdownTimer();
      timeleft = 0;
      setModalTimerText(Timer.counterForSeconds(timeleft));
      setCompleteButtonStatus(true);
      notification = new Notification("Timer Finished!");
      snd.play();
      onComplete();
      return;
    }

    setModalTimerText(Timer.counterForSeconds(timeleft));
  }
};


