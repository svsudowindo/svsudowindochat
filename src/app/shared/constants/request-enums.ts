export const RequestEnums = {
  REGISTRATION: {
    type: 'POST',
    path: '/auth/:companyID/register',
    keys: ['companyID'],
    values: []
  },
  LOGIN: {
    type: 'POST',
    path: '/auth/login',
    keys: [],
    values: []
  },
  RESET_PASSWORD: {
    type: 'POST',
    path: '/admin/token/reset-password',
    keys: [],
    values: []
  }
};

