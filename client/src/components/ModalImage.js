import React, { useState } from 'react'

import '../styles/ModalImg.css';


const ModalImage = ({clickedImg, setClickedImg}) => {
    
    const handleClick = (e) => { 
        if(e.target.classList.contains("dismiss")){
            setClickedImg(null);
        }
    }

    return (
    <div className="overlay-img dismiss" onClick={handleClick}>
        <img className="imageModal" src={clickedImg} alt="cit buildings" />
        <span className="dismiss" onClick={handleClick}>X</span>
    </div>
  )
}

export default ModalImage