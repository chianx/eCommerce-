const nodeMailer = require("nodemailer");

const sendEmail = async (options) =>{
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    });

    const mailOptins = {
        from : process.env.SMTP_MAIL,
        to : options.email,
        subject : options.subject,
        text : options.msg,
    };

    await transporter.sendMail(mailOptins);
}

module.exports = sendEmail;