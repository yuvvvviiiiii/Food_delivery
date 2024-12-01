import React from 'react'
import { useNavigate } from 'react-router-dom';
import './navbar.css'
import { location, shopping_cart, forward_button, logo, user_logo, profile_icon } from '../../assets'

const Navbar = ({openModal, closeModal}) => {

  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');
  const handleClick = () => {
    if(!userName){
      navigate('/login');
    } else {
      navigate('/profile');
    }
  }

  return (
    <div className="nav-container">
      <div className='navbar'>
        <div className='nav-info'>
          <p> Get 5% Off your first order, <span>Promo: ORDER5</span></p>
        </div>
        
          <div className='location'>
            <img src={location} alt="" />
            <p>Regent Street, A4, A4201, London</p>
            <span>Change Location</span>
          </div> 
        
        <div className='cart-btn' >
          <button className='shopping-btn' onClick={openModal}>
            <img src={shopping_cart} alt="" />
            My Cart
          </button>
          <button className='value-btn'>
          GBP 79.89
          </button>
          <button className='forward-btn' onClick={closeModal}>
            <img src={forward_button} alt="" />
          </button>
        </div>
      </div>
      <div className="nav-content">
        <div className='nav-logo'>
          <img src={logo} alt="" />
        </div>
        <div className='nav-btn'>
          <button className='home-btn'>Home</button>
          <button className='browse-btn'>Browse Menu</button>
          <button className='special-btn'>Special Offers</button>
          <button className='restaurants-btn'>Restaurants</button>
          <button className='login-btn' onClick={handleClick}>
            <img src={user_logo} alt="" />
            {userName ? userName : 'login/signup'}
            </button>
        </div>
      </div>
      <div className='nav-responsive'>
        <div className='res-logo'>
          <img src={logo} alt="" />
        </div>
        <div className='res-info'>
          <div className='res-user' onClick={handleClick}>
            <img src={profile_icon} alt="" />
            <p>{userName ? userName : 'login/signup'}</p>
          </div>
          <div className='res-cart' onClick={openModal}>
          <img src={shopping_cart} alt="" />
          <p>My Cart</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
