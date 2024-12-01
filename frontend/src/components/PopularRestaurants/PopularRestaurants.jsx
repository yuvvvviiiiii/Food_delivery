import React, { useEffect, useState } from 'react'
import './popularRestaurants.css';
import { fetchImage } from '../../utils';
import { useNavigate } from 'react-router-dom';

const PopularRestaurants = () => {

  const navigate = useNavigate();
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
      const fetchImages = async () => {
       try{ setLoading(true);
        const data = await fetchImage();
        setImages(data.images);
        setLoading(false);
      }
     catch (error) {
      console.log(error);
    } 
    finally{
      setLoading(false);
    }
    };
    fetchImages();
  }, []);

  const handleClick = () => {
    navigate('/product-page')
  }

  if(loading){
    return <div>Loading...</div>
  }

  return (
    <div className='popular-restaurant'>
      <div className="popular-header">
        <p>Popular Restaurants</p>
      </div>
      {
      images && images.popularRestaurants && (
        <div className='popular-category'>
          <div className='popular-card' onClick={handleClick}>
            <img src={images.popularRestaurants.mcdonalds} alt="Mcdonald" />
            <p>McDonald’s London</p>
          </div>
          <div className='popular-card' onClick={handleClick}>
            <img src={images.popularRestaurants.papajohns} alt="Mcdonald" />
            <p>Papa Johns</p>
          </div>
          <div className='popular-card' onClick={handleClick}>
            <img src={images.popularRestaurants.kfc} alt="kfc" />
            <p>KFC West London</p>
          </div>
          <div className='popular-card' onClick={handleClick}>
            <img src={images.popularRestaurants.texas} alt="texas" />
            <p>Texas Chicken</p>
          </div>
          <div className='popular-card' onClick={handleClick}>
            <img src={images.popularRestaurants.burgerking} alt="burgerking" />
            <p>Burger King</p>
          </div>
          <div className='popular-card' onClick={handleClick}>
            <img src={images.popularRestaurants.shaurma} alt="burgerking" />
            <p>Shaurma 1</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PopularRestaurants
