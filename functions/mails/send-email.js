import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const { email } = JSON.parse(event.body);
  const { title } = JSON.parse(event.body);

  await transporter.sendMail({
    from: 'shopminionscontato@gmail.com',
    to: [email, 'karenalmeida340@gmail.com'],
    subject: 'shopminions - reserva de boneco ',
    html: `Seu(s) produto(s) <br> " ${title} " <br> foram reservado(s) com sucesso!`
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ sucess: true }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}
