Template.userPill.onRendered(function() {
    console.log("Template.userPill.rendered");
    $('[data-toggle="popover"]').popover();
});

Template.userPill.helpers ({
  userStatusClass : function() {
    // if (this.user.status.idle)
    //  return "user-idle"
    // else

    if (this.status.online)
      return "user-online"
    else
      return "user-offline"
  }
});

