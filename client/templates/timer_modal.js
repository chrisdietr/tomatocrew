Meteor.subscribe("tasksList");
Meteor.subscribe("latestUserTask");

Template.timerModal.helpers ({

  // DFL TODO: We're relying on this helper being triggered by including {{latestUserTaskName}}
  // in the template. Should to subscribe / Dep / etc directly without template.
  latestUserTaskName : function() { 
    var task = Tasks.findOne({userId: Meteor.userId()}, {sort: {submitted: -1}});
    if (task) {
      var nowDate = new Date();
      var taskEndDate = new Date(task.endDate);
      console.log(task);
      if ( taskEndDate > nowDate) {
        dummyTimerSetup(task);
      } else {
        // DFL TODO: invalidate task
      }
      return task.name + " : " + task.endDate;        
    }
  },
});

// Template.timerModal.events({ 

//   'click abort': function () {
//     console.log("BLAAA DEEEE BLAA");
//   }
// });


dummyTimerSetup = function (task) {
      setModalTitleText("Working. Focus!");
      runModalTimer(task, onDummyTimerComplete);
};

var onDummyTimerComplete = function(){
  setModalTitleText("Done!");

  // DFL TODO: Break mode
  // setTaskEditability(true);
  // runModalTimer(3, function(){
  //   setModalTitleText("DONE")
  // });
};

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


// DFL TODO: Scope & lifetime conflicts 

var runModalTimer = function(task, onComplete) {

  if (task.endDate < new Date()) {
    console.log("Tried running timer for past date");
    return;
  }
  var counter = setInterval(timer, 1000); // milliseconds
  var timeleft = Timer.secondsTilDate(task.endDate);  

  // setModalTimerText('');
  // setModalTimerTask('');

  $('#timerModal').modal();
  setModalTimerTask(task.name);
  setModalTimerText(Timer.counterForSeconds(timeleft));

  function timer() {
    --timeleft;
    if (timeleft <= 0) {
      clearInterval(counter);
      setModalTimerText('__:__:00');
      onComplete();
      return;
    }

    setModalTimerText(Timer.counterForSeconds(timeleft));
  }
};
