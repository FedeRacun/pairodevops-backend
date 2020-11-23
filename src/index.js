const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

const port = process.env.PORT || 3400;

app.use(cors());
app.use(express.json());


app.post("/send-email", (req, res)=> {

    const fromEmail = process.env.FROM_EMAIL
    const formPass = process.env.FROM_PASS
    const toEmail = process.env.TO_EMAIL


    const mailerConfig = {
        service: 'gmail',
        host: "ssmtp.gmail.com",
        auth: {
            user: fromEmail,
            pass: formPass
        }
    };

    const transporter = nodemailer.createTransport(mailerConfig);

    let mailOptions = {
        from: mailerConfig.auth.user,
        to: toEmail,
        subject: `[WEB] - Contacto ${req.body.name}`,
        html: `<body>    <div
        style="
          width: 80%;
          min-height: 300px;
          display: block;
          border: 0.5px solid gray;
          border-radius: 5px;
        "
      >
        <div
          style="
            font-size: 2em;
            background-color: #0077b5;
            color: white;
            width: 100%;
            max-height: 50px;
          "
        >
        <style>
        .titulo > a {
          text-decoration: none;
          color: white;
        }
      </style>
          <span style="margin-left: 0.5em; text-decoration: none;color: white;" class="titulo">
            ${req.body.name}
          </span>
        </div>
        <span style="text-indent: 5px; margin-top: 10px; margin-left: 10px">
        ${req.body.message}
        </span>
        <button
        style="
          width: 30%;
          margin: 4rem auto;
          border: none;
          background-color: #2e9d52;
          border-radius: 5px;
          color: white;
          padding: 1em;
          font-weight: 800;
          display: block;
        "
      >
        <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${req.body.email}" style="text-decoration: none; color: white;">
          Responder
        </a>
      </button>
      </div>

      <small style="color: gray;">from:</small> <small>${req.body.email}</small>
      </body>`
    };


    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            res.json({status: 599, mail: error.response});
            console.log('error:', error.response);
        } else {
            res.json({status: 200, mail: 'Mail has been sended'});
            console.log('Mail has been sended');
        }
    });
})

console.log('Iniciando server al puerto: ',process.env.PORT)

async function main() {
    await app.listen(port);
    console.log('Server iniciado en el puerto: ', port)
}

main();