/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import Image from './Image';
import MapGoogle from './MapGoogle';
import MapGoogleSteetView from './StreetViewMaps'; 


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

const Message = ({messageContent, handleClickFile, copyEmailLink, index, author}) => {
  return (
    <div>
        <div key={index} className="message" id={author}>

            <div className='message-box' id={author + "-box"}>
                <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                    <p id="time">{messageContent.time}</p>
                </div>

                <div className="message-content">     
                    {/* default message */}
                    <p >{messageContent.message}</p>


                    {/* website link url */}
                    {messageContent.typeData === 'website' ? 
                        <a className="link-content" href={messageContent.link}>
                            <FontAwesomeIcon icon={faGlobe} />
                            {messageContent.link}
                        </a>
                        : <></>
                    }

                    {/* fb link content */}
                    {messageContent.typeData === 'fb-link' ? 
                        <a className="link-content" href={messageContent.link}>
                            <FontAwesomeIcon icon={faFacebookSquare} />
                            {messageContent.link}
                        </a>
                    : <></>
                    }

                    {/* Send file pdf content */}
                    {messageContent.typeData === 'file' ? 
                        <a  className="link-content" href="#" 
                            onClick={(e) => { handleClickFile(e)}}>
                            <FontAwesomeIcon icon={faFilePdf} />
                            {messageContent.modifyName}
                        </a>
                    : <></>}
                    

                    {/* Email content */}
                    {messageContent.typeData === 'email' ? 
                        <a className="link-content" onClick={() => { copyEmailLink(messageContent.email)}}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            {messageContent.email}
                        </a>
                    : <></>
                    }
                    
                    {/* Image Content */}
                    {messageContent.typeData === 'image' ? <Image imgKey={messageContent.imageName}/> : ''}

                    {/* Map Content */}
                    {messageContent.typeData === "map" ? <MapGoogle /> : null}
                
                    {/* Street View Content */}
                    {messageContent.typeData === "streetview" ? <MapGoogleSteetView /> : null}
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Message;