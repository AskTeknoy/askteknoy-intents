import React, { useState, useEffect } from 'react';
import { Offline, Online } from "react-detect-offline";
import { useSpeechSynthesis } from 'react-speech-kit'; 

// static photos 
import Darius from "./images/team_profiles/darius.jpg"; 
import Khyle from "./images/team_profiles/khyle.jpg";
import Jessa from './images/team_profiles/jessa.jpg'; 
import Rheaynne from "./images/team_profiles/rheaynne.jpg"; 
import Stefan from './images/team_profiles/stefan.jpg';

import '../styles/About.css';
import '../styles/responsive/about-rwd.css';
import SkeletonAbout from '../components/skeleton/SkeletonAbout';

const About = () => {
  const [IsDisplayDars, setIsDisplayDars] = useState(false);
  const [IsDisplayKhyle, setIsDisplayKhyle] = useState(false);
  const [IsDisplayJessa, setIsDisplayJessa] = useState(false);
  const [IsDisplayRay, setIsDisplayRay] = useState(false);
  const [IsDisplayStefan, setIsDisplayStefan] = useState(false);

  const { cancel } = useSpeechSynthesis(); 

  const developers = [
        {name: 'Kim Darius Panis', role: 'Lead Developer', github: "https://github.com/WhooperDar", fb: "https://www.facebook.com/whooperdrs/", imgFile: Darius, nickName: 'Dars'},
        {name: 'Khyle Cardosa', role: 'UI/UX Designer', github: "https://github.com/kvcards26", fb: "https://www.facebook.com/kvcards26", imgFile: Khyle, nickName: 'Khyle'},
        {name: 'Jessa Macapagong', role: 'Scrum Master', github: "https://github.com/jmacapagong", fb: "https://www.facebook.com/jmacapagong", imgFile: Jessa, nickName: 'Jessa'},
        {name: 'Rheaynne Ray Eduyan', role: 'Product Owner', github: "https://github.com/rheaynne", fb: "https://www.facebook.com/rheaynneeduyan", imgFile: Rheaynne, nickName: 'Ray'},
        {name: 'Stefan James Tudtud', role: 'Quality Assurance Manager', github: "https://github.com/jamestudtud13", fb: "https://www.facebook.com/stefanjames.tud2d", imgFile: Stefan, nickName: 'Stefan'},
  ]

  const displayAboutInfo = (profile) => {
    if(profile === 'Dars'){
        setIsDisplayDars(true); 
        return;
    }
    else if(profile === 'Khyle'){
        setIsDisplayKhyle(true); 
        return;
    }
    else if(profile === 'Ray'){
        setIsDisplayRay(true);
        return;
    }
    else if(profile === 'Jessa'){
        setIsDisplayJessa(true);
        return;
    }
    else if(profile === 'Stefan'){
        setIsDisplayStefan(true);
        return;
    }
    else {
        setIsDisplayDars(false);
        setIsDisplayKhyle(false);
        setIsDisplayRay(false);
        setIsDisplayJessa(false);
        setIsDisplayStefan(false);
        return;
    }
  }

  useEffect(() => {
    cancel();
    document.title = "AskTeknoy | About Us";
  }, [cancel])
  
  return (
    
    <>
        <Online>
            <SkeletonAbout></SkeletonAbout>
        </Online>
        
        <Offline>
            <div className='about-view'>
                <div className="about-title">
                    <h2>About Us</h2>
                    <p> We are looking forward to welcome you in our campus at N. Bacalso Ave., Cebu City, Cebu, Philippines, 6000. You can call us on 261-7741 and 411-2000.</p>
                </div>

                <div className='about-container'> 
                <div className="profiles">
                    {developers.map((developer) =>{
                        return(            
                            <div className='container'>                    
                                <img className='profile-pic' src={developer.imgFile} alt={developer.name} />
                                <h2 onClick={() => { displayAboutInfo(developer.nickName) }} className='title'>{developer.name}</h2>
                                <p className='role'>{developer.role}</p>

                                <div className='overlay-effect'>
                                    <a href={developer.github}><img className='logo-social' src={require(`../pages/images/logo/github-askteknoy.png`)} alt="github--" /></a>
                                    <a href={developer.fb}><img className='logo-social' src={require(`../pages/images/logo/fb-logo-askteknoy.png`)} alt="fb----" /></a>
                                </div>
                                {/* {IsDisplayRay && <Profiles name={developer.name} role={developer.role} age={developer.age}  imgFile={developer.imgFile} imageName={developer.name}/>} */}
                            </div>    
                        )      
                    })}   
                </div>         
                </div>
            </div>
        </Offline>
    
    </>
    
   
  )
}

export default About