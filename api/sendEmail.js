import Mailjet from 'node-mailjet'

const isDev = process.env.NODE_ENV === 'development'

export default (request, response) => {
  const mailjet = new Mailjet({
    apiKey: '49ed16debe3959a0283d93e8ff7f7cb3',
    apiSecret: '2dd73338f7879b19e28d7ff4643317ba',
  })

  console.log('request: ', { body: response.body })

  const endpoint = mailjet.post('send', { version: 'v3.1' })

  const requestOptions = {
    Messages: [
      {
        From: {
          Email: 'tasteink@inktastings.com',
          Name: `${request.body.firstName} ${request.body.lastName}`,
        },
        To: [
          {
            Email: isDev ? 'colshacol@gmail.com' : 'Hollandrc.llc@gmail.com',
            Name: 'Holland Construction',
          },
        ],
        Subject: 'New Website Contact Form Submission',
        TextPart: 'New Contact Form Submission',
        HTMLPart: `FROM: ${request.body.emailAddress}\n\n${request.body.message}`,
        CustomID: 'ContactFormSubmitted',
      },
    ],
  }

  endpoint
    .request(requestOptions)
    .then((result) => {
      console.log('\n\n', { body: result.body }, '\n\n')

      response.status(200).json({
        success: true,
      })
    })
    .catch((error) => {
      console.log('---- 0')
      console.error(error.statusCode)
      console.log('---- 1')
      console.error(error)

      response.status(200).json({
        success: false,
        error,
      })
    })
}
