import React from 'react'
import '../../styles/Profiles.css';

const Profiles = ({name, role, age, imgFile, imageName}) => {
  return (
    <div>
        <img src={imgFile} alt={imageName} />
        <h2>{name}</h2> <span>{age}</span>
        <p>{role}</p>
    </div>
  )
}

export default Profiles