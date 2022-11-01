/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/Navbar.css';
import '../styles/responsive/nav-rwd.css';

const Navbar = () => {
  const navRef = useRef(); 

  const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

  return (
    <>
        <nav >
          <div className="logo">Ask<span className='span-logo'><Link to="/">TEKNOY</Link></span></div>
            <ul ref={navRef}>
              <li><Link to="/" onClick={showNavbar}>Home</Link></li>
              <li><Link to="/about" onClick={showNavbar}>About</Link></li>
              <li><Link to="/contacts" onClick={showNavbar}>Contact</Link></li>
              <li><a href="https://cit.edu/" className="home-cit" onClick={showNavbar}>CIT-U Home</a></li>    
              <button className='nav-btn nav-close-btn'>
                <FontAwesomeIcon icon={faTimes} onClick={showNavbar}/>
              </button>
            </ul>
            
            <button className='nav-btn nav-color' onClick={showNavbar}>
              <FontAwesomeIcon icon={faBars} /> 
            </button>
        </nav>
    </>
      
  )
}

export default Navbar