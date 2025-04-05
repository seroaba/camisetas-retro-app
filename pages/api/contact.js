export default async function handler(req, res) {
  const { name, email, message, image } = req.body;

  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seroaba2@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: 'web@camisetas-retro.com',
    to: 'seroaba2@gmail.com',
    subject: 'Nuevo pedido desde la app',
    html: `<p><strong>Nombre:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Mensaje:</strong> ${message}</p>
           <p><strong>Diseño seleccionado:</strong><br><img src="${image}" width="200"/></p>`
  });

  res.status(200).json({ success: true });
}
