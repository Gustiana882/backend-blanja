const nodemailer = require('nodemailer');

const sendEmail = async (toEmail, toName, token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    service: 'yahoo',
    secure: false,
    auth: {
      user: 'blanjanow.online@yahoo.com',
      pass: 'koaqfjtxuwdkbpey',
    },
  });

  const option = {
    from: 'blanjanow.online@yahoo.com',
    to: toEmail,
    subject: `Activation for ${toName}`,
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.1/css/bootstrap.min.css"/>
        <title></title>
      </head>
      <body>
        <main>
          <div class="col-12 col-md-6 mx-auto p-5">
            <div class="mx-auto">
              <img class="rounded mx-auto d-block py-5" src="https://res.cloudinary.com/dhu2tfdji/image/upload/v1633166584/Blanja/assets/Group_1158_qnp8kl.png" alt="logo"/>
              <p class="text-center">
                Terimakasih telah mendaftar di Blanja, situs jual beli online. untuk
                mengaktifkan akun anda silahkan tekan tombol verifikasi.
              </p>
              <p>${token}</p>
              <a href="#" class="btn btn-danger rounded-pill px-5 position-absolute top-50 start-50 translate-middle">Verifikasi</a>
            </div>
          </div>
        </main>
      </body>
    </html>`,
  };

  transporter.sendMail(option, (err, info) => {
    if (err) return console.log(err);
    return info;
  });
};

module.exports = sendEmail;
