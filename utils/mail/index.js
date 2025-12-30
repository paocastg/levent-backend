const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (name, email, subject, body, emailcompany) => {
  try {
    const msg = {
      to: emailcompany,
      from: process.env.SENDER_EMAIL,
      subject: subject,
      text: `Hola, soy ${name}, me interesa cotizar tu servicio`,
      html: `
        <p>Hola, soy ${name}, me interesa cotizar tu servicio.</p>
        <p>Email de contacto: ${email}</p>
        <p>${body}</p>
      `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error enviando correo:', error);
    throw error;
  }
};

