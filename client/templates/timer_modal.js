Template.timerModal.onRendered(function() {

  var checkActiveTask = function() {
    var task = Tasks.activeTask();
    if(task) {
      setModalTitle("Working. Focus!");
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
    Tasks.cancelActiveTasks();
  }
});

var onTimerComplete = function(){
  setModalTitle("Done!");
  // DFL TODO: Break mode
  // setTaskEditability(true);
  // runModalTimer(3, function(){
  //   setModalTitle("DONE")
  // });
};

// HTML Document Setters and Getters

//var setTaskEditability = function(editable) {
//  if (editable) {
//    $('#timerModalTaskField').show();
//    $('#timerModalTask').hide();
//  } else {
//    $('#timerModalTaskField').hide();
//    $('#timerModalTask').show();
//  }
//}

var setModalTitle = function(text) {
  $('#timerModalTitle').html(text);
};

var setModalTimerText = function(text) {
  $('#timerModalTime').html(text);
};

var setModalTimerTask = function(text) {
  $('#timerModalTask').html(text);
  $('#taskField').html(text);
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
  setModalTimerTask(task.name);
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


