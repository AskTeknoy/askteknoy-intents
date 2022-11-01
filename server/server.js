const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const fs = require('fs').promises 
const { NlpManager } = require('node-nlp');
const moment = require('moment'); 
const extractUrl = require('extract-urls'); 
const email = require('node-email-extractor').default;
const { findPhoneNumbersInText, findNumbers  } = require('libphonenumber-js');
const path = require('path'); 
const { sentenceCase } = require("sentence-case");
const { capitalCase } = require('change-case');
const { GetImageLocation, GetFile } = require('./firebase/getImage');
const { SaveData, SaveDataFeedback } = require('./firebase/models/userContact');
const { SendEmail } = require("./utils/SendEmail"); 

const trainModel = require('./train'); // automatic train  model

// middlewares 
const app = express() 
app.use(cors())

// change file name 
let fileName = " "; 

// manager to open model
const manager = new NlpManager({language: ["en"]}); 

manager.load(); 

// create server
const server = http.createServer(app) 

// io socket connection to client
const io = new Server(server, { 
    cors: { 
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
})

// request to server 
app.get("/download-pdf", (req, res) => {

    const file = __dirname + `\\syllabus\\${fileName}`;  
    console.log(file);    
    res.download(file);
}); 

// listening to client connection 
io.on("connection", socket => {

    let typeData = "text"; // default data value
    let botMessageContent = {}; // init bot response
    const time = moment().format("LT"); // current time sent

    // check connection
    if(socket.id){
       console.log(`User connected: ${socket.id}`);

       // initial message of the bot
        const defaultGreetingsHi = [
            "Hey there!, I'm AskTeknoy your virtual assistant. How may I help you?", 
            "Hello, I'm AskTeknoy, how may I help you?", 
            "Hello, I'm chatbot assistant, AskTeknoy, ready to help you!", 
            "Greetings, I'm AskTeknoy, a query chatbot, at your service.", 
            "AskTeknoy is here, how may I help you?"
        ]

        // random message of the greetings bot
        const randomDefaultGreetingsHi = defaultGreetingsHi[Math.floor(Math.random() * 4)]; 
        
        botMessageContent = {
            author: "AskTeknoy", 
            message: randomDefaultGreetingsHi,
            time: time, 
            typeData: typeData, 
            imageURL: null   
        }

        // send initial message to client
        socket.emit("receive-message", botMessageContent);      
    }
    
    // contact user
    socket.on("save-contact-user", (userContactData) => {
        if(SaveData(userContactData)){
            console.log("data saved contact"); 
            socket.emit("firebase-contacts", {isSuccess: true})
            
        }
        else {
            socket.emit("firebase-contacts", {isSuccess: false})
        }
    });

    // feedback user 
    socket.on("user-feedback", (userFeedbackMessage) => {
        if(SaveDataFeedback(userFeedbackMessage)){
            console.log("data saved feedback");
            socket.emit("firebase-feedback", {isSuccess: true});
            
            // SendEmail(userFeedbackMessage); 
        }
        else {
            socket.emit("firebase-feedback", {isSuccess: false}); 
        }
    })

    // when user send message 
    socket.on("send-query", async (messageClient) => {
        
        // nlp word finder
        const response = await manager.process("en", messageClient.message); 
        // const time = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
        
        // random bot response 
        const randomDefault = [ 
            "What was it?", 
            "I don't understand, can you please try again?",
            "Sorry, I didn't get it.",
            "One more time?", 
            "I missed what you said. Chat it again?", 
            "I don't understand, can you repeat?"
        ]; 

        const defaultAnswer =  randomDefault[Math.floor(Math.random() * 6)]; 
        
        const intent = response.intent; // user intent
        
        if(response.answer){

            // fb page website intents
            if(intent.includes("fb.page") ){
                typeData = "fb-link"; 
                
                try {
                    // link url 
                    const linkUrl = extractUrl(response.answer)[0]; 

                    // separate link and non link
                    const messageLink = (response.answer).replace(linkUrl, ""); 

                    botMessageContent = {
                        author: "AskTeknoy", 
                        message: messageLink,
                        time: time, 
                        typeData: typeData, 
                        link: linkUrl, 
                        imageURL: null   
                    }
                    
                    // send bot response to client 
                    await socket.emit("receive-message", botMessageContent);
                }
                catch(err){
                    console.log(err); 
                }
            }
            // website response 

            else if(intent.includes("website") || intent.includes("link")){
                typeData = "website"; 

                 // website link url 
                const webLinkUrl = extractUrl(response.answer)[0]; 

                // separate link and non link
                const messageLink = (response.answer).replace(webLinkUrl, ""); 
                                    

                botMessageContent = {
                        author: "AskTeknoy", 
                        message: messageLink,
                        time: time, 
                        typeData: typeData, 
                        link: webLinkUrl, 
                        imageURL: null   
                }
                
                await socket.emit("receive-message", botMessageContent);

            }
            // email intent
            else if(intent.includes("email") || intent.includes("emails")){
                typeData = "email"; 
                
                try { 
                    // extract email data 
                    const botAnswerEmail = response.answer; 
                    const emailUrlData = email.text(botAnswerEmail);
                    const emailUrl = emailUrlData.emails[0]; 
                    
                    // separate email and non email
                    const messageEmail = botAnswerEmail.replace(emailUrl, ""); 

                    botMessageContent = {
                        author: "AskTeknoy",
                        time: time, 
                        typeData: typeData, 
                        email: emailUrl, 
                        message: messageEmail,
                        imageURL: null            

                    }

                    // send email type to client 
                    await socket.emit("receive-message", botMessageContent);
                }
                catch(err){
                    console.log(err);
                }
            }
            
            // location map
            else if(intent.includes("address")){
                typeData = "map"; 

                try { 

                    botMessageContent = { 
                        typeData: typeData, 
                        author: "AskTeknoy", 
                        time: time, 
                        message: response.answer, 
                        
                    }

                    await socket.emit("receive-message", botMessageContent);

                }
                catch (e){ 
                    console.log("Error"); 
                }
            }

            // street view intent
            else if(intent.includes("streetview")){
                typeData = "streetview"; 

                try { 
                    
                    botMessageContent = { 
                        typeData: typeData, 
                        author: "AskTeknoy", 
                        time: time, 
                        message: response.answer, 
                    }

                    await socket.emit("receive-message", botMessageContent);
                }
                catch(error){
                    console.log(error); 
                }
            }
            // send pdf syllabus
            else if(intent.includes("syllabus")){
                typeData = "file"; 
                try {
                    
                    // intent.file -> Intent File
                    const modifiedFileName = capitalCase(sentenceCase(intent));
                    console.log(modifiedFileName)
                    fileName = intent + ".pdf" ;   
                    console.log(fileName);

                    botMessageContent = {
                        author: "AskTeknoy", 
                        time: time, 
                        typeData: typeData, 
                        message: response.answer,
                        modifyName: modifiedFileName,  
                        fileName: fileName,
                        imageURL: null            
                    }   

                    await socket.emit("receive-message", botMessageContent);
                }
                catch(err){
                    console.log(err);
                }
            }
            
            else if(intent.includes("contacts")){

                typeData = "contact"; 
                const phoneNumber = findNumbers(response.answer, 'US'); 
                // const newMessageContact = (response.answer).replace(phoneNumber, ""); 

                botMessageContent = {
                    author: "AskTeknoy", 
                    message: response.answer, 
                    time: time, 
                    typeData: typeData,
                    imageURL: null            
                }

                await socket.emit("receive-message", botMessageContent);

            }

            // location (image) intent
            else if(intent.includes("location")) { 
   
                // image files (location and building)
                
                try {
                    const imageName = `${intent}`; 
                    const imageFileName = imageName.replaceAll('.', '_');
                    
                    
                    // const imageURL = GetImageLocation(imageFileName); 
                    // console.log(`image url: ${imageURL}`);

                    // current intent
                    const imageURL =`../image_location/${intent}.jpg`; 

                    typeData = "image"; 
                    
                    botMessageContent = {
                        author: "AskTeknoy", 
                        message: response.answer, 
                        time: time, 
                        typeData: typeData,  
                        imageName: imageFileName,
                        imageURL: imageURL, 
                    }

                    // send bot response to client 
                    await socket.emit("receive-message", botMessageContent);
                }
                catch(err){
                    console.log(err); 
                }

            } else {
                
                try {
                    typeData = "text"; 

                    botMessageContent = {
                        author: "AskTeknoy", 
                        message: response.answer, 
                        time: time, 
                        typeData: typeData,
                        imageURL: null   

                    }

                    // send bot response to client 
                    await socket.emit("receive-message", botMessageContent);
                }
                catch(err){
                    console.log(err)
                }
            }
        } 

        else {
            
            // default text
            await socket.emit("receive-message", { 
                            author: "AskTeknoy", 
                            message: defaultAnswer, 
                            time: time, 
                            typeData: typeData, 
                            imageURL: null   

            });   
        }

        console.log("======= User Bot interaction ========"); 
        console.log(`User Message: ${messageClient.message}`);
        console.log(`Bot Message: ${response.answer}`);
        console.log("=====================================\n\n"); 
    
    })

    socket.on("disconnect", () => { 
        console.log(`User disconnected: `, socket.id);
    })
})

const PORT = process.env.PORT || 4001; 

server.listen(PORT, () => { 
    console.log(`Server on port: ${PORT}`);
})