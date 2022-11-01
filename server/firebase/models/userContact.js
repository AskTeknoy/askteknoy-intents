const admin = require('firebase-admin'); 
const credentials = require('../config/askteknoy-key.json'); 
const { v4:uuid } = require('uuid'); 
const { async } = require('@firebase/util');
const moment = require("moment");

const ConnectDB = () => {

    if(admin.apps.length === 0){
        admin.initializeApp({
                credential: admin.credential.cert(credentials)
        }); 
    }

    // firebase db connection 
    const db = admin.firestore(); 

    console.log("connect to db"); 

    return db;
}

const SaveData = async (contactUserData) => {
    const dbContact = ConnectDB(); 
    const ContactUserID = uuid(); 
    
    if (contactUserData !== null){

        const userContactData = {
            id: ContactUserID,
            name: contactUserData.fullName, 
            email: contactUserData.emailAddress, 
            contactMessage: contactUserData.message,
            time: contactUserData.time
        }

        // save data to firebase firestore
        const response = await dbContact.collection('user_contact').doc(ContactUserID).set(userContactData);  
       
        if (response !== null) return true; 
    }

    
    return false;
}

const SaveDataFeedback = async (userFeedback) => {
    const dbFeedback = ConnectDB(); 

    const feedbackID = uuid(); 

    if(userFeedback !== null){
        // user feedback data
        const userFeedbackData = { 
            id: feedbackID, 
            time: moment().format('MMMM Do YYYY, h:mm:ss a'),
            feedbackMessage: userFeedback.feedbackMessage, 
            emailAddress:  userFeedback.emailAddress
        }

        const responseContact = await dbFeedback.collection("user-feedback").doc(feedbackID).set(userFeedbackData); 

        if(responseContact !== null) return true; 
        
    }
    return false
}


module.exports = { SaveData, SaveDataFeedback }; 
