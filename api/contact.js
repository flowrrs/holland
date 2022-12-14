const nodemailer = require('nodemailer')

const isDev = process.env.NODE_ENV === 'development'

// This function runs when a HTTP request is made
// to http://holland.construction/api/contact.

export default (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tasteink@inktastings.com',
      pass: 'Rokkibeats1!',
    },
  })

  const mailOptions = {
    from: req.body.emailAddress,
    to: isDev ? '1990colton@gmail.com' : 'Hollandrc.llc@gmail.com',
    subject: 'New Contact Form Submission',
    text: `From: ${req.body.firstName} ${req.body.lastName}\n\n${req.body.message}`,
  }

  const handleMailSent = (error, info) => {
    const data = error || info.response
    console.log('Done sending email:', data)

    res.status(200).json({
      success: true,
      error,
      info,
    })
  }

  transporter.sendMail(mailOptions, handleMailSent)
}
