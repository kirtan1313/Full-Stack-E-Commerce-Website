const nodeMailer = require('nodemailer')

const sendEmail = async (option) => {
    try {
        const transporter = nodeMailer.createTransport({
            host:process.env.SMPT_HOST,
            port:process.env.SMPT_PORT,
            service: process.env.SMPT_SERVICE,
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOption = {
            from: process.env.SMPT_MAIL,
            to: option.email,
            subject: option.subject,
            text: option.message,
        };

        await transporter.sendMail(mailOption);
    } catch (error) {
        throw error; 
    }
};



module.exports = sendEmail