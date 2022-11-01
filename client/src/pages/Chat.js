/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect} from 'react'; 
import { useSpeechSynthesis } from 'react-speech-kit'; 
import ScrollToBottom from 'react-scroll-to-bottom';
import { Alert } from 'react-st-modal';
import Axios from 'axios';
import FileDownload from 'js-file-download';
import moment from 'moment';
import copy from 'copy-to-clipboard';

// components
import Message from '../components/MessageBody';
import '../styles/Chat.css'; 
import '../styles/responsive/chat-rwd.css';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';

// photos 
import AskTeknoyImg from '../pages/images/avatar/AskTeknoy.png';

function Chat({socket}) {
  const [userQuery, setQuery] = useState(""); 
  const [messageList, setMessageList] = useState([]); 
  const [fileName, setFileName] = useState(""); 
  const [hasClicked, setHasClicked] = useState(false);
  const [offAudio, setOffAudio] = useState(false);

  const defaultAuthor = "Guest";

  // speack  
  const { speak, speaking, cancel, voices } = useSpeechSynthesis(); 

  let messageData = { }; 

  // user query
  const sendQuery = async () => {
    if(userQuery !== ""){
    
        messageData = { 
            author: defaultAuthor,
            message: userQuery, 
            time: moment().format("LT")
            // time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }

        setMessageList((list) => [...list, messageData])

        await socket.emit("send-query", messageData); 
    }

    setQuery(" "); 
  }

  // turn off audio
  const turnOffAudio = () => {
    setOffAudio(!offAudio);

    if(offAudio){
        cancel();
    }  
  }

  // render download data file
  const handleClickFile = (e) => { 
    e.preventDefault();

    // get request for file download
    Axios({
        url: "http://localhost:4001/download-pdf", 
        method: "GET", 
        responseType: "blob"
    })
    .then((res) => { 
        console.log(res);
        FileDownload(res.data, `${fileName}`); 
    })

    .catch(err => alert("File does not exist"));
  }

  // email to clipboard
  const copyEmailLink = async (emailLink) => {
    copy(emailLink);

    await Alert("Email link copied to clipboard."); 
  }

  useEffect(() => { 
    document.title = "Start Ask AskTeknoy";

    // receive message from bot 
    socket.off("receive-message").on('receive-message', (botMessageRes) => { 
        setMessageList((list) => [...list, botMessageRes])

        // text to speech
        // Google UK English male voice
        if(speaking){
            if(!offAudio){
                cancel();
                speak({text: botMessageRes.message, voice: voices[9]});
                return;
            }
            else {
                cancel();
            }
            
        } else {
            if(!offAudio){
                speak({text: botMessageRes.message, voice: voices[9]}); 
                return;
            } 
            else {
                cancel();
            }
        }
        
        if(botMessageRes.typeData === "file"){ 
            setFileName(botMessageRes.fileName);
        }

        if(hasClicked) {
            document.title = "Start ask AskTeknoy";
        }  
        else {
            if(botMessageRes){
                setInterval(()=> {
                    document.title = "AskTeknoy has a message...";
                }, 3000)
            }
        }
    })

  }, [cancel, hasClicked, socket, speak, speaking, voices, offAudio]);


  return (
    <div className="App">
        <p className="section-title">Start Chat AskTeknoy</p>
        <div className="chat-window">
            <div className="chat-header">
                <div className="img-chat">
                    <img src={AskTeknoyImg} alt="AskTEKNOY" />
                </div>
                <div className="chat-text">
                    <p className="chat-title">AskTEKNOY</p>
                    <p className="chat-smltxt">CIT-U Inquiry Chatbot</p>
                </div>

                <div className='mic'>
                    <button onClick={turnOffAudio}>
                        {offAudio === true? 
                            <FontAwesomeIcon icon={faMicrophoneSlash} /> 
                            : 
                            <FontAwesomeIcon icon={faMicrophone} />}
                        </button>
                </div>
                
            </div>
            <div className="chat-body">
            <ScrollToBottom className="message-container" mode="bottom">
                {messageList.map((messageContent, index) => {
                    return (
                        <> 
                            {messageContent.author === "AskTeknoy" ? 
                                <Message 
                                    messageContent={messageContent} 
                                    index={index}
                                    handleClickFile={handleClickFile} 
                                    copyEmailLink={copyEmailLink}   
                                    author="AskTeknoy"
                            /> 
                            :
                            <Message 
                                messageContent={messageContent} 
                                index={index}
                                handleClickFile={handleClickFile} 
                                copyEmailLink={copyEmailLink}   
                                author="Guest"
                            />
                            }
                        </>
                    )
                })}
            </ScrollToBottom>
    
                <div className="chat-footer">
                    <input 
                        type="text"
                        value={userQuery}
                        placeholder={"Enter message..." || userQuery} 
                        onClick={() => { setHasClicked(true)}}
                        onChange={(event) => setQuery(event.target.value)} 
                        onKeyPress={(event) => event.key === "Enter" && sendQuery()}
                        />
                    <button onClick={sendQuery}>&#10148;</button>
                </div>
            </div>        
        </div>
    </div>
  )
}

export default Chat