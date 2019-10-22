var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'svsudowindo@gmail.com',
        pass: '8125431943'
    }
});

var mailOptions = {
    from: 'svsudowindo@gmail.com',
    to: '',
    subject: '',
    text: ''
};

// to connect to any email and allow them to send mail Less secure app access should be in ON state we can do by following link
// https://myaccount.google.com/lesssecureapps?pli=1 

module.exports = function (toEmail, toPassword = null, subject, textOtherThanCredentials, sendCredentials) {
    mailOptions['to'] = toEmail;
    mailOptions['subject'] = subject;
    mailOptions['text'] = textOtherThanCredentials + (sendCredentials ? ('\nUsername: ' + toEmail + '\nPassword: ' + toPassword) : '');
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
        } else {
            return info.response
        }
    });
}