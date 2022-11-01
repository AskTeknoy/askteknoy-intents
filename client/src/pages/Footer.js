import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <div className="footer-block">
        <div className="footer-main">
            <p>Copyright 2022. All rights Reserved</p>
            
            <div className="logos">
                <a href="https://facebook.com"><img src={require("./images/logo/fb-logo-askteknoy.png")} alt="" /></a>
                <a href="https://instagram.com"><img src={require("./images/logo/insta-askteknoy.png")} alt="" /></a>
                <a href="https://github.com"><img src={require("./images/logo/github-askteknoy.png")} alt="" /></a>
                <a href="https://twitter.com"><img src={require("./images/logo/twitter-askteknoy.png")} alt="" /></a>
            </div>        
        </div>
    </div>
   
  )
}

export default Footer