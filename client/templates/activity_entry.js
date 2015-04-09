Template.activityEntry.helpers({
  timeAgo : function() {
    if (this.endDate > Date.now()) {
      return 'now';
    } else {
      return moment(this.endDate).fromNow();
    }
  }
});
