import React from 'react';
import { download_img, facebook_icon, instagram_icon, snapchat_icon, tiktok_icon, footer_logo } from '../../assets';
import './footer.css';

const Footer = () => {
  return (
    <div className='container-footer'>
    <div className='footer-upper'>
      <div className='logo-section'>
        <div className='company-logo'>
          <img src={footer_logo} alt="LOGO" />
        </div>
        <div className='download-icon'>
        <img src={download_img} alt="Download Now" />
        </div>
        <p>Company # 490039-445, Registered with House of companies.</p>
      </div>
      <div className='subscribe-section'>
        <span>Get Exclusive Deals in your Inbox</span>
        <div className='subscribe'>
        <input type="text" placeholder='youremail@gmail.com'/>
        <button className='subscribe-btn'>Subscribe</button>
        </div>
        <div className='msg'>
        <p>we wont spam, read our <span>email policy</span></p>
        </div>
        <div className='icons'>
          <img src={facebook_icon} alt="facebook" />
          <img src={instagram_icon} alt="instagram" />
          <img src={tiktok_icon} alt="instagram" />
          <img src={snapchat_icon} alt="instagram" />
        </div>
      </div>
      <div className='add-info'>
        <div className='legal-page'>
          <span>Legal Pages</span>
          <p>Terms and conditions</p>
          <p>Privacy</p>
          <p>Cookies</p>
          <p>Modern Slavery Statement</p>
        </div>
        <div className="important-link">
          <span>Important Links</span>
          <p>Get Help</p>
          <p>Add your restaurant</p>
          <p>Sign up to deliver</p>
          <p>Create a business account</p>
        </div>
      </div>
    </div>
    <div className='copyrights-section'>
      <div className='copyright'>
        <p>Order.uk Copyright 2024, All Rights Reserved.</p>
      </div>
      <div className='personal-info'>
        <p>Privacy Policy</p>
        <p>Terms</p>
        <p>Pricing</p>
        <p> Do not sell or share my personal information</p>
      </div>
    </div>
    </div>
  )
}

export default Footer;

  