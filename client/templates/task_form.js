
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

      setModalTitleText("Working. Focus!");
      setModalTimerTask(task.name);

      var onComplete = function(){
        setModalTitleText("Aaah, time to relax.");

        setTaskEditability(true);

        runModalTimer(3, function(){
          setModalTitleText("DONE")
        });
      };

      runModalTimer(task.intervalDuration, onComplete);

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

var pad2 = function(n) {
  n = n + '';
  return n.length > 1 ? n : '0' + n;
}

var clockFormat = function(date) {
  return pad2(date.getUTCHours()) + ":" + pad2(date.getUTCMinutes()) + ":" + pad2(date.getUTCSeconds());
}


// DFL TODO: Scope & lifetime conflicts 

var runModalTimer = function(timeleft, onComplete) {
  var counter = setInterval(timer, 1000); // milliseconds
  var startDate = new Date();
  var finishDate = startDate.setSeconds(startDate.getSeconds()+timeleft);
  
  setModalTimerText('');
  $('#timerModal').modal();

  setModalTimerText(clockFormat(new Date(finishDate - Date.now())));

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
      clockFormat( new Date(finishDate - Date.now()) ) 
    );
  }
};



// var runModalTimer = (function(){

//   var counter;
//   var startDate;
//   var finishDate;
//   setModalTimerText('');


//   return function() {
//     $('#timerModal').modal();
//     var counter = setInterval(timer, 1000); // milliseconds
//     var startDate = new Date();
//     var finishDate = startDate.setSeconds(startDate.getSeconds()+timeleft);
//     setModalTimerText(clockFormat(new Date(finishDate - Date.now())));

//     function timer() {
//       --timeleft;
//       if (timeleft <= 1) {
//       clearInterval(counter);
//       //counter ended, do something here
//       setModalTimerText('');
//       onComplete();
//       return;
//     }

//     setModalTimerText( 
//       clockFormat( new Date(finishDate - Date.now()) ) 
//     );
    
//     }

//   };
// })();