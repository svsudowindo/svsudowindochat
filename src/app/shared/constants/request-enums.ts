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
  },
  COMPANY_LIST: {
    type: 'GET',
    path: '/admin/token/fetch-company-list',
    keys: [],
    values: []
  },
  GET_COMPANY_BY_ID: {
    type: 'GET',
    path: '/admin/token/get-company-details/:companyID',
    keys: ['companyID'],
    values: []
  },
  UPDATE_COMPANY: {
    type: 'POST',
    path: '/admin/token/update-company/:companyID',
    keys: ['companyID'],
    values: []
  },
  CREATE_EMPLOYEE: {
    type: 'POST',
    path: '/auth/token/register',
    keys: [],
    values: []
  },
  EMPLOYEE_LIST: {
    type: 'GET',
    path: '/admin/token/fetch-employees',
    keys: [],
    values: []
  },
  GET_EMPLOYEE_BY_ID: {
    type: 'GET',
    path: '/admin/token/getEmployeeByID/:employeeID',
    keys: ['employeeID'],
    values: []
  },
  UPDATE_EMPLOYEE: {
    type: 'POST',
    path: '/admin/token/updateEmployee/:employeeID',
    keys: ['employeeID'],
    values: []
  },
  PERSONAL_DETAILS: {
    type: 'POST',
    path: '/admin/token/setPersonalDetails/:companyID',
    keys: ['companyID'],
    values: []
  },
  GET_PERSONAL_DETAILS_BY_ID: {
    type: 'GET',
    path: '/admin/token/getPersonalDetails/:companyID',
    keys: ['companyID'],
    values: []
  },
  EMPLOYMENT_DETAILS:  {
    type: 'POST',
    path: '/admin/token/setEmployeementDetails/:companyID',
    keys: ['companyID'],
    values: []
  },
  GET_EMPLOYMENT_DETAILS_BY_ID: {
    type: 'GET',
    path: '/admin/token/getEmployeementDetails/:companyID',
    keys: ['companyID'],
    values: []
  },
  EDUCATIONAL_DETAILS:  {
    type: 'POST',
    path: '/admin/token/setEducationalDetails/:companyID',
    keys: ['companyID'],
    values: []
  },
  GET_EDUCATIONAL_DETAILS_BY_ID: {
    type: 'GET',
    path: '/admin/token/getEducationalDetails/:companyID',
    keys: ['companyID'],
    values: []
  },
  EMPLOYEES_BULK_UPLOAD: {
    type: 'POST',
    path: '/admin/token/employees-bulk-upload/:companyID',
    keys: ['companyID'],
    values: []
  },
  DELETE_EMPLOYEE_BY_ID: {
    type: 'DELETE',
    path: '/admin/token/delete-employee-by-id/:employeeID',
    keys: ['employeeID'],
    values: []
  }
};

