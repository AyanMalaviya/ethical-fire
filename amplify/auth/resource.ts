import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true, // We'll use email temporarily since phone OTP needs Lambda setup
  },
  multifactor: {
    mode: 'OPTIONAL',
    sms: true,
  },
});
