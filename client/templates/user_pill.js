Template.userPill.helpers ({
  userStatusClass : function() { 
    // if (this.user.status.idle)
    //  return "user-idle"
    // else
    
    if (this.user.status.online) 
      return "user-online"
    else 
      return "user-offline"
  }
});
