const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const smtp_login  = process.env.SMTP_LOGIN || ""
const smtp_password  = process.env.SMTP_PASSWORD || ""

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password
    }
})

app.get('/', function (req, res) {
    res.send('Hello world!')
})

app.post('/sendMessage', async function (req, res) {
    const {Email, Name, Message} = req.body.data

    const info = await transporter.sendMail({
        from: 'Portfolio form',
        to: 'itdevreact@gmail.com',
        subject: "Potential vacancy",
        html: `<b>Message from portfolio</b>
   <div>
     Name: ${Name}
   </div>
   <div>
     Contacts: ${Email}
   </div>
   <div>
     Message: ${Message}
   </div>
`
    })
    res.send({message: `Yor message has been Received. Name: ${Name}, Contacts: ${Email}, Message: ${Message}`
})
})

app.post('/sendTest', async function (req, res) {
    const { Message} = req.body.data

    const info = await transporter.sendMail({
        from: 'Portfolio form',
        to: 'itdevreact@gmail.com',
        subject: "Potential vacancy",
        html: `<b>Message from portfolio</b>
   
   <div>
     Message: ${Message}
   </div>
`
    })
    res.send({message: `Yor message has been Received. Number: ${Message}`
    })
})

const port = process.env.PORT || 4000

app.listen(port, function () {
    console.log('app listening on port 4000!')
})