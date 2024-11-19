const mailer = require('../config/mailer')

const sendPasswordResetEmail = (email, resetToken) => {

    const htmBody = `
    <h1>Reset Password</h1>
    <p>Click the link below to reset your password</p>
    <a href="${''}/reset-password/${resetToken}">Reset Password</a>`


    const mailOptions = {
        from: '"Reset Password" <>', // sender address
        to: email, // list of receivers
        subject: 'Reset Password', // Subject line
        text: 'Rest Password', // plain text body
        html: htmBody // html body

    }

    return mailer.sendMail(mailOptions) // Send email
        .then(() => { console.log('Password reset email sent to:', email); })

}

module.exports = sendPasswordResetEmail
