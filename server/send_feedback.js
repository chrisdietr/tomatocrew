Meteor.methods({
  sendFeedbackEmail: function (from, text) {
    check([from, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

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
});
