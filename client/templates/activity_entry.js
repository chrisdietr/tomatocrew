

var durationInMinutes = function(start, end) {
  var msPerMin = 60 * 1000;
  return (end - start) / msPerMin;
}

Template.activityEntry.helpers({
  actionPhrase: function () {
    if (this.endDate > Date.now()) {
      return 'is working on';
    } else if (this.finishReason === Tasks.FinishReason.CANCEL) {
        return 'canceled';
    } else {
      return 'worked on';
    }
  },
  timePhrase: function () {
    if (this.endDate > Date.now()) {
      return durationInMinutes(this.submitted, this.endDate) + ' min';
    } else {
      return moment(this.endDate).fromNow();
    }
  }
});
