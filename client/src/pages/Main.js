/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import validator from 'email-validator'; 
import { Alert } from 'antd'; 
import { Offline, Online } from "react-detect-offline";
import { useSpeechSynthesis } from 'react-speech-kit'; 

// styles 
import 'antd/dist/antd.css';
import '../styles/Main.css'; 
import '../styles/responsive/main-rwd.css';

// skeletons
import SkeletonPageOne from '../components/skeleton/SkeletonPageOne';

const Main = ({socket}) => {
    const [emailAddress, setEmailAddress] = useState("");
    const [feedbackMessage, setFeedBackMessage] = useState(""); 
    const [isSuccess, setIsSuccess] = useState(false); 
    const [isError, setIsError] = useState(false); 
    const [isNotValidEmail, setIsNotValidEmail] = useState(false); 

    const FeaturesRef = useRef(null); 

    const { cancel } = useSpeechSynthesis(); 

    const sendFeedbackMessage = () => {
        if(emailAddress !== "" && feedbackMessage !== ""){
            
            if(validator.validate(emailAddress)){
                const feedbackUserMessage = {
                    emailAddress: emailAddress, 
                    feedbackMessage: feedbackMessage, 
                }
                socket.emit("user-feedback", feedbackUserMessage);

                setEmailAddress("");  
                setFeedBackMessage("");  
                return 
            }   
           
            setIsNotValidEmail(true); 
            setEmailAddress("");  
        }
        setEmailAddress("");  
        setFeedBackMessage("");  
        
    }

    useEffect(() => {
        document.title = "AskTeknoy";
        cancel(); 
        // state firebase fetch data (success or fail)
        socket.on("firebase-feedback", (data) => {
            setIsSuccess(false);

            if(data.isSuccess){
                setIsSuccess(data.isSuccess);
                return  
            }
            setIsError(!data.isSuccess); 
        });

    }, [socket, setIsSuccess, setIsError, cancel])

    return (
    <section>       
        <Offline>       
            <div className='intro'>
                <div className="description">
                    <div className="content">

                        <h2 className='title-intro'>Start chatting with the new university inquiry <span className='chatbot-title'>chatbot</span></h2>
                        <p>Do you have unanswered questions regarding school matters that require an immediate response? Try asking AskTeknoy! It is a trained university chatbot that provides a reliable and 24/7 customer support to help students, parents, teachers or any individual who have questions and concerns about CIT-U.</p>
                        <Link to="/chatbot">Start Chatting Now &#10140;</Link>
                    </div>

                    <div className="circle-container">
                        <div className="circle"></div>
                        <img src={require("./images/logo/girl.png")} alt="woman"/>
                    </div>
                </div>
            </div>
            

            <div className="features-view" ref={FeaturesRef}>
            
            <div className="title-features">
                <h2 className="feat-title">Chatbot Features</h2>
            </div>
            <div className="features-container">

                <div className="features feature-1">
                    <img src={require("./images/logo/real-time.png")} alt="real time response"/>
                    <div className="feature-description">
                        <h2>Real-time response</h2>
                        <p>Provides a real-time and human-like reponses by substituting human support agents with artificial intelligence (AI) for faster, more reliable and 24/7 customer support.
                        </p>
                    </div>
                </div>

                <div className="features feature-2">
                    <img src={require("./images/logo/nlp.png")} alt="nlp"/>
                    <div className="feature-description">
                        <h2>NLP enabled</h2>
                        <p>This chatbot is NLP enabled which makes it possible for the application to understand human language.
                        </p>
                    </div>
                </div>

                <div className="features feature-3">
                    <img src={require("./images/logo/analytical.png")}  alt=""/>
                    <div className="feature-description">
                        <h2>Analytical</h2>
                        <p>The data gathered by the chatbot through customer interaction provides personalized experience to users.
                        </p>

                    </div>
                </div>

                <div className="features feature-4">
                    <img src= {require("./images/logo/multi-media.png")} alt=""/>
                    <div class="feature-description">
                        <h2>Multi-media integration</h2>
                        <p>AskTeknoy is integrated with different media formats such as texts, graphics, sound and images.
                        </p>
                    </div>
                </div>

                <div className="features feature-5">
                    <img src={require("./images/logo/text-to-speech.png")} alt=""/>
                    <div className="feature-description">
                        <h2>Text-to-speech</h2>
                        <p>With this AI feature, AskTeknoy reads its digital text response aloud imitating or sounding like a human voice.
                        </p>
                    </div>
                </div>

                <div className="features feature-6">
                    <img src={require("./images/logo/map.png")} alt=""/>
                    <div className="feature-description">
                        <h2>Google Maps Integration</h2>
                        <p>Integration
                            The application provides a google map street view of the exact address and location of CIT - University.
                        </p>
                    </div>
                </div>
                </div>
        </div>


        <div className="how-to-use">
            <div className="how-description">
                <h2>How to use?</h2>
                <p>Before clicking on to this website, A stable internet connection is a must. Then go to https://www.askteknoy.com to the official homepage of AskTeknoy to see the about page, overview and features of this webapp.</p>
                <p>At the side you can see a chatbot, please click on the chatbot and It will send you greetings . Input your inquiries there in the textbox below or use the built-in microphone from the chatbot regarding the university After inputting your inquiries, please click send and the chatbot will generate a text-to-speech in responding to your inquiries and will give you the right response!</p>
            </div>
            <div className="how-img">
                <img src={require("./images/logo/how-to-use.png")} alt="Chat System"/>
            </div>
        </div>

        <div className="feedback">
            <img src={require("./images/logo/girl2.png")} alt="Girl Picture"/>

            <div className="form">
                <h2 className='send-feedback-title'>Send Feedback Anytime</h2>
                <p>If you found any issues and suggestions on the chatbot, <br/> feel free to react out to the team.</p>
                
                {isSuccess &&
                    <Alert 
                        type='success'
                        message='Success'
                        description="Your response have been saved. Thank you for your feedback."
                        closable
                        showIcon
                    />}
                
                {isError && 
                    <Alert 
                        type='error'
                        message='Error'
                        description="Can't saved your query, please try again later."
                        closable
                        showIcon
                    />}

                {isNotValidEmail &&
                    <Alert 
                        type='warning'
                        message='Warning'
                        description="Your email is invalid, please try again."
                        closable
                        showIcon
                    />
                }

                <div className="form-section">
                    <div className="form-container">
                    <input type="text" 
                        value={emailAddress}
                        placeholder="Email Address"
                        onChange={(e) => { setEmailAddress(e.target.value)}}
                        onKeyPress={(e) => e.key === "Enter" && sendFeedbackMessage()}
                        />
                    
                    <textarea 
                        cols="30" 
                        rows="10" 
                        value={feedbackMessage}
                        placeholder='Write your message here...'
                        onChange={(e) => { setFeedBackMessage(e.target.value)}}
                        onKeyPress={(e) => e.key === "Enter" && sendFeedbackMessage()}
                        ></textarea>            
                    </div>
                </div>

                <div className="feedback-btn">
                    <button onClick={sendFeedbackMessage}>Send feedback</button>
                </div>
            </div>
        </div>
        
        <div className="chat-section">
            <h2 className='start-chat-title'>Got your questions ready?</h2>
            <Link to="/chatbot">Start Chat</Link>
        </div>
    </Offline>
    
    <Online><SkeletonPageOne /></Online>

  </section>
  )
}

export default Main; 