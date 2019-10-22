var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%&!@';

exports.generatePassword = (length) => {
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

exports.sendResponse = (statusCode, data, errors, message) => {
  return JSON.stringify({status: statusCode, data: data, errors: errors, message: message});
}
