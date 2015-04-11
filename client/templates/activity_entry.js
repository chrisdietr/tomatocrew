Template.activityEntry.helpers({
  actionPhrase: function () {
    return (this.endDate > Date.now()) ? 'is working on' : 'worked on';
  },
  timePhrase: function () {
    var msPerMin = 60 * 1000;
    var minutesDuration = -(this.submitted - this.endDate)/msPerMin;
    return (this.endDate > Date.now()) ? 'for ' + minutesDuration + ' minutes' : moment(this.endDate).fromNow();
  }
});
