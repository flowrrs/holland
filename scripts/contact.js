/**
 * When the form is submitted, we need to get the
 * data out of the form and send it off to our API
 * to send the contact email.
 */

const contactForm = document.getElementById('contactForm')
const contactFormButton = document.getElementById('contactFormButton')
const contactFirstNameInput = document.getElementById('contactFirstNameInput')
const contactLastNameInput = document.getElementById('contactLastNameInput')
const textareaInput = document.getElementById('textareaInput')
const contactEmailAddressInput = document.getElementById(
  'contactEmailAddressInput'
)

const contactSuccessMessage = document.getElementById('contactSuccessMessage')
const waitToContactMessage = document.getElementById('waitToContactMessage')
const contactSendingMessage = document.getElementById('contactSendingMessage')
const incompleteFieldsMessage = document.getElementById(
  'incompleteFieldsMessage'
)

const store = {
  lastContactSubmitTime: 1639614273254,
}

const waitTime = window.location.origin.includes('localhost') ? 8000 : 30000

const handleContactFormButtonClick = async (event) => {
  const firstName = contactFirstNameInput.value
  const lastName = contactLastNameInput.value
  const emailAddress = contactEmailAddressInput.value
  const message = textareaInput.value

  if (!firstName || !lastName || !emailAddress || !message) {
    toggleDisplayValue(incompleteFieldsMessage)

    return setTimeout(() => {
      toggleDisplayValue(incompleteFieldsMessage)
    }, 8000)
  }
  // Throttle form submissions.
  const lastSubmittedTime = localStorage.getItem('lastContantSubmitTime')
  const nowTime = Date.now()
  const timeDifference = nowTime - lastSubmittedTime

  // If lastSubmittedTime is falsey, that means the form
  // has never been submitted from this browser.
  if (lastSubmittedTime && timeDifference < waitTime) {
    return showWaitToContactMessage()
  }

  localStorage.setItem('lastContantSubmitTime', nowTime)
  toggleDisplayValue(contactSendingMessage)

  await fetch('/api/sendEmail', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      firstName,
      lastName,
      emailAddress,
      message,
    }),
  })

  contactFirstNameInput.value = ''
  contactLastNameInput.value = ''
  textareaInput.value = ''
  contactEmailAddressInput.value = ''
  showContactSuccessMessage()
}

const showWaitToContactMessage = () => {
  toggleDisplayValue(waitToContactMessage)
  setTimeout(() => toggleDisplayValue(waitToContactMessage), 5000)
}

const showContactSuccessMessage = () => {
  toggleDisplayValue(contactSendingMessage)
  toggleDisplayValue(contactSuccessMessage)
  setTimeout(() => toggleDisplayValue(contactSuccessMessage), 5000)
}

contactFormButton.addEventListener('click', handleContactFormButtonClick)
