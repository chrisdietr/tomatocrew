Accounts.onCreateUser(function(options, user) {
  var gravUrl = Gravatar.imageUrl(user.emails[0].address, {
    size: 60,
    default: 'mm'
  });
  var gravDict = {avatarUrl: gravUrl};
  user.profile = user.profile ? _.extend(user.profile, gravDict) : gravDict;
  return user;
});