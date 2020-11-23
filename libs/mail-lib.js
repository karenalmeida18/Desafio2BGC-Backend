import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default function mail(lambda) {
  return async function (event, context) {
    let email, statusCode;

    try {
      email = await lambda(event, context);
      statusCode = 200;

      transporter.sendMail({
        from: 'shopminionscontato@gmail.com',
        to: email,
        subject: 'shopminions - reserva de boneco ',
        text: 'Seu produto foi reservado!'
      }, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    } catch (err) {
      console.log(err);
      statusCode = 500;
    }

    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}