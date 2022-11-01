import React, { useState } from 'react'
import  LibraryImages  from './LibraryImages.js';

import '../styles/Image.css'
const Image = ({imgKey}) => {
  const [clickedImg, setClickedImg] = useState(null);

  const handleClickedImg = (imgSrc) => {
    setClickedImg(imgSrc); 
    console.log("clicked")
  }

  return (
    <div>
        {/* image content message */}  

        <div>
          <img 
            style={
              { maxWidth: "100%",
                width: 240,
                height: "auto", 
                borderRadius: 10, 
                marginTop: 10,
                marginBottom: 5, 
                marginLeft: 1, 
                objectFit: 'cover',
                justifyContent: 'center',
                } 
              }
              id="imageLoc" 
              // src={`../../public/image_location/${messageContent.imageName}.jpg`}
              src={LibraryImages[imgKey] || 'data:image/gif;base64,R0lGODlhAQABAAAQABAAA='}
              onError= {e => e.target.style.display = 'none'}
              // alt={messageContent.imageName}
              alt='cit buildings'
              onClick={() => handleClickedImg(LibraryImages[imgKey])}  
          />
        </div>              
        
        {/* {clickedImg && 
          <ModalImage 
            clickedImg={LibraryImages[imgKey]} 
            setClickedImg={setClickedImg}
            
          />} */}
    </div>
  )
}

export default Image