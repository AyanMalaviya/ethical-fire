import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    phoneNumber: {
      mutable: true,
      required: false,
    },
    preferredUsername: {
      mutable: true,
    },
  },
});
