const accountSid = precess.env.TWILIO_SID
const authToken = precess.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);

async function sendSMS(body, phone){
    message = 'Thank you for your response. Here is the record of your response... \n'
    for(const key in body){
        message += `${key}: ${body[key]} \n`
    }
    client.messages
    .create({body: message, from: '+16403446335', to: phone})
    .then(message => console.log(message.sid))
    .catch(err => console.log(err))
}


module.exports = {sendSMS}