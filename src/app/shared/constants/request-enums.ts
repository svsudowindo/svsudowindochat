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
  FORGOT_PASSWORD: {
    type: 'POST',
    path: '/auth/forgot-password',
    keys: [],
    values: []
  },
  RESET_PASSWORD: {
    type: 'POST',
    path: '/admin/token/reset-password',
    keys: [],
    values: []
  },
  CREATE_COMPANY: {
    type: 'POST',
    path: '/auth/token/register',
    keys: [],
    values: []
  }
};

