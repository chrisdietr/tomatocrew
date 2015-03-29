Timer = {
  secondsTilDate : function(date) {
    var startDate = new Date();
    var endDate = new Date(date);
    return Math.round((endDate.getTime() - startDate.getTime()) / 1000);
  },

  counterForSeconds : function(seconds) {

    var pad2 = function(num) {
      num += '';
      return num.length > 1 ? num : '0' + num;
    }

    var hours = Math.floor(seconds / 3600);
    seconds =  Math.round(seconds - hours * 3600);
    var minutes = Math.floor(seconds / 60);
    seconds = Math.round(seconds - minutes * 60);

    return '' + pad2(hours+'') + ':' + pad2(minutes+'') + ':' + pad2(seconds+'');
  },

};
