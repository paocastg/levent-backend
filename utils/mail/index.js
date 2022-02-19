const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid");

exports.sendEmail = async (name, email, subject, body, emailcompany) => {
  const options = {
    apiKey: process.env.SENGRID_API_KEY,
  };

  let transporter = nodemailer.createTransport(sgTransport(options));

  let info = await transporter.sendMail({
    from: `${process.env.SENDER_EMAIL}`, // sender address
    to: `${emailcompany}`, // list of receivers
    subject: `${subject}`, // Subject line
    text: `Hola, soy ${name} , me interesa cotizar tu servicio`, // plain text body
    html: `<p>Hola, soy ${name} , me interesa cotizar tu servicio, enviar cotizacion al ${email}, </p><p> ${body} </p>`, // html body
  });
};
