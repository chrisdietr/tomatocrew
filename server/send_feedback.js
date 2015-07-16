Meteor.methods({
  sendFeedbackEmail: function (from, text) {
    check([from, text], [String]);


    var sendEmail = function() {
      console.log('User feedback from: ' + from + ' \n' + text);
      try {
        Email.send({
          to: 'dustinlaverick+soprofeedback@gmail.com',
          from: from,
          subject: 'User Feedback Form',
          text: text
        });
      } catch (error) {
        console.log('Unable to send email: ' + error);
      }
    }
    Meteor.defer(sendEmail);
  }
});
