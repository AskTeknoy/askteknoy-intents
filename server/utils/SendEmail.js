const fs = require('fs');
const path = require('path'); 
const nodemailer = require('nodemailer'); 
const { async } = require('@firebase/util');


const getCredentials = (keyPath) => {
    // open key file credentials
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(keyPath)
    });

    let password = " "; 
    let email = " "; 


    // separate key gmail and password from key 
    lineReader.on('line', function (line) {
        if(line.includes('email:')){
            email = line.replace("email:", "").trim();
        }

        if(line.includes('pass:')){
            password = line.replace("pass:", "").trim();
        }
        });
    
    return { email, password }; 
}

const SendEmail = (userFeedback) => {
    const credential = getCredentials(path.join(__dirname, "key.txt"));

    const mailTransporter = nodemailer.createTransport({
        service: "hotmail",
        port: 587, 
        secure: false, 
        auth: {
            user: credential.email,
            pass: credential.password
        } 
    })

    const details = { 
        from: credential.email,
        to: userFeedback.emailAddress,
        subject: "AskTEKNOY: Feedback response", 
        text: userFeedback.feedbackMessage
    }

    mailTransporter.sendMail(details, (err, data) => {
        if(err){
            console.log(err);
        }
        else {
            console.log(data)
        }
    })
}

module.exports = { SendEmail }