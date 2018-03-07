const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('Welcome to Computer Society of Kimathi USSD Service')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  if (text == '') {
    // Return main menu on first request
    let response = `CON Welcome to CSOK
    1. Who We Are
    2. Why Join Us
    3. How To Join 
    4. Our History`
    res.send(response)
  } else if (text == '1') {
    // Who We Are
    let response = `CON 
    We are a student club that aims to empower students by bringing cutting-edge technology, new ideas, and top tech-innovators to campus.`
    res.send(response)
  } else if (text == '2') {
    // Why join us
    let response = `END 
    By joining us, you will:
    1. Gain software development skills
    2. Meet like minded people and make friends
    3. Invited to Hackathons and tech events
    4. See new places and and do new things
    5. It's fun!
    `
    res.send(response)
  } else if (text == '3') {
    // Why join us
    let response = `END 
    Visit https://csokimathi.club 
    or
    Call/Text/Whatsapp Grace at 0798 634 840
    `
    res.send(response)
  } else if (text == '4') {
    // This is a second level response where the user selected 1 in the first instance
    let balance = 'NGN 10,000'
    // This is a terminal request. Note how we start the response with END
    let response = `END Your balance is ${balance}`
    res.send(response)
  } else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})