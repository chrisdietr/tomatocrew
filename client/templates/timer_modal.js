Meteor.subscribe("tasksList");
Meteor.subscribe("latestUserTask");

Template.timerModal.helpers ({
 
  // DFL TODO: We're relying on this helper being triggered by including {{latestUserTaskName}}
  // in the template. Should to subscribe / Dep / etc directly without template.
  latestUserTaskName : function() { 
    var task = Tasks.findOne({userId: Meteor.userId()}, {sort: {submitted: -1}});
    var nowDate = new Date();
    var taskEndDate = new Date(task.endDate);

    console.log(task);
    if ( taskEndDate > nowDate) {
      dummyTimerSetup(10);
    } 
    return task.name + " : " + task.endDate;
  },
});

// Template.timerModal.events({ 

//   'click abort': function () {
//     console.log("BLAAA DEEEE BLAA");
//   }
// });



dummyTimerSetup = function (duration) {
      setModalTitleText("Working. Focus!");
      setModalTimerTask(task.name);
      runModalTimer(task.intervalDuration, onDummyTimerComplete);
};

var onDummyTimerComplete = function(){
  setModalTitleText("Aaah, time to relax.");
  setTaskEditability(true);
  runModalTimer(3, function(){
    setModalTitleText("DONE")
  });
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

var runModalTimer = function(timeleft, onComplete) {
  var counter = setInterval(timer, 1000); // milliseconds
  var startDate = new Date();
  var finishDate = startDate.getHours(startDate.getHours()+timeleft);
  
  setModalTimerText('');
  $('#timerModal').modal();

  setModalTimerText((new Date(finishDate - Date.now()).clockFormat()));

  function timer() {
    --timeleft;
    if (timeleft <= 1) {
      clearInterval(counter);
      //counter ended, do something here
      setModalTimerText('');
      onComplete();
      return;
    }

    setModalTimerText( 
      (new Date(finishDate - Date.now())).clockFormat()
    );
  }
};
