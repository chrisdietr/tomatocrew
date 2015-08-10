var email = AccountsTemplates.removeField('email');
var pwd = AccountsTemplates.removeField('password');

email.re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

AccountsTemplates.addFields([
  email,
  {
    _id: 'username',
    type: 'text',
    displayName: 'Username',
    required: true,
    minLength: 3
  },
  pwd
]);


AccountsTemplates.configure({

  // Client-side Validation
  continuousValidation: true,
  negativeFeedback: true,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,
});
