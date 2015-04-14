Timer = {
  secondsTilDate : function(date) {
    var startDate = new Date();
    var endDate = new Date(date);
    return Math.round((endDate.getTime() - startDate.getTime()) / 1000);
  },

  counterForSeconds : function(seconds) {
    return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
  }

};
