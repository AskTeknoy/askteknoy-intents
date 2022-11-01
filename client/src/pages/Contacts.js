/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Alert } from 'antd'; 
import moment from 'moment';
import validator from 'email-validator'; 
import { Offline, Online } from "react-detect-offline";
import { useSpeechSynthesis } from 'react-speech-kit'; 


// styles 
import 'antd/dist/antd.css';
import '../styles/Contacts.css';
import '../styles/responsive/contact-rwd.css';

// skeletal design 
import SkeletonContact from '../components/skeleton/SkeletonContact';


const Contacts = ({socket}) => {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState(""); 
  const [message, setMesssage] = useState("");
  const [isErrorData, setIsErrorData] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(false); 
  const [isInvalidEmail, setIsInvalidEmail] = useState(false); 
  
  const { cancel } = useSpeechSynthesis(); 

  const saveResponse = async () => {

    if(fullName !== "" && emailAddress !== "" && message !== ""){
        
        // checks valid emails 
        if(validator.validate(emailAddress)){
            
            // prepare data to save
            const userContactData = {
                fullName: fullName, 
                emailAddress: emailAddress, 
                message: message, 
                time: moment().format('MMMM Do YYYY, h:mm:ss a')    
            }

            // save data to database
             await socket.emit("save-contact-user", userContactData); 
        } 
        else { 
            setIsInvalidEmail(true); 
            setEmailAddress(""); 
            return;
        }
    }

    setFullName(""); 
    setEmailAddress(""); 
    setMesssage("");  
  }

  
  useEffect(() => {
    cancel();
    document.title = "AskTeknoy | Contact";
    // contacts from server response (firebase fetch)
    socket.on("firebase-contacts", (dataContacts) => {
        if(dataContacts.isSuccess){
            setIsSuccess(dataContacts.isSuccess); 
            return
        }
        else {
            setIsErrorData(dataContacts.isSuccess);
        }
    })
  }, [socket, cancel]);

  return (
    <>
        <Online>
            <SkeletonContact />
        </Online>


        <Offline>       
            <div className='contact-container'>
                <div className="contact">
                    <div className="descript-contact">
                        <h2>Contact Us</h2>
                        <p>Got any questions to the team? Fill up the form <br/> below and we'll get in touch</p>
                    </div>

                <div className='alerts'>
            
                    {isSuccess &&
                        <Alert 
                            type='success'
                            message='Success'
                            description="Your response have been saved"
                            closable
                            showIcon
                    />}

                    {isInvalidEmail &&
                        <Alert 
                            type='warning'
                            message='Warning'
                            description="Your email is invalid, please try again."
                            closable
                            showIcon
                    />}

                    
                    {isErrorData && 
                        <Alert 
                            type='error'
                            message='Error'
                            description="Can't saved your query, please try again later."
                            closable
                            showIcon
                    />}
                </div>
                <div className='fields-container'>
                        <div className='fields'>
                            <input 
                                type="text" 
                                value={fullName} 
                                placeholder='Full name' 
                                onChange={(e) => setFullName(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && saveResponse()}
                                />
                            
                            <input 
                                type="text" 
                                value={emailAddress} 
                                placeholder='Email address' 
                                onChange={(e) => setEmailAddress(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && saveResponse()}
                                />
                        </div>   

                        <textarea 
                            name="Message" 
                            value={message} 
                            placeholder="Message" 
                            cols="107" rows="15" 
                            onChange={(e) => setMesssage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && saveResponse()}
                                
                        ></textarea>
                </div>
                
                    <div className='send-btn'>
                        <button 
                        onClick={saveResponse}
                    
                        >Send</button>
                    </div>

                </div>
            </div>
        </Offline> 
    </>
  )
}

export default Contacts