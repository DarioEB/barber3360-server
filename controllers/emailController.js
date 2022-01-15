const nodemailer = require('nodemailer');
require('dotenv').config({path: '.env'});

exports.shiftVerificationEmail = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })

        // send mail
        let info = await transporter.sendMail({
            from: `BARBER EMAIL TEST <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verificación de reservación de turno",
            text: `Hola ${name}! Gracias por elegirnos. Haz click en este link cuando tengas que verificar tu reservación.`
        });

        console.log(info);
        console.log("Mensaje enviado: ", info.messageId);
    } catch (err) {
        console.log(err);
    }
}