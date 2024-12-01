import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import '../../styles/home.css';
import { banner1, banner2, download_img, food_icon, logo, next_btn, order_food, order_icon, tickbox, tracking_icon } from '../../assets';
import { fetchImage } from '../../utils';
import PopularRestaurants from '../../components/PopularRestaurants/PopularRestaurants';

export default function Home() {
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true);
        const data = await fetchImage();
        setImages(data.images);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
        <div className="home-container">
          <div className='banner'>
            <div className="left-section">
              <p className='banner-order'>Order Restaurant food, takeaway and groceries.</p>
              <p className='feast'>Feast Your Senses,</p>
              <span className='fast'>Fast and Fresh</span>
              <p className='postcode'>Enter a postcode to see what we deliver</p>
              <div className='banner-input'>
              <input type="text" placeholder='e.g. EC4R 3TE' />
              <button>search</button>
              </div>
            </div>
            <div className='main-image'>
              <img src={banner1} alt="" />
            </div>
            <div className='right-section'>
              <img src={banner2} alt="" />
            </div>
            <div className='orange-section'>
              <div className='notification-1'>
                <div>
                <img src={logo} alt=""  className='notify-logo'/>
                <p className='notify-title'>We’ve Received your order!</p>
                <p className='notify-desc'>Awaiting Restaurant acceptance <img src={tracking_icon} alt="" /></p>
                </div>
                <div className='now'>
                  <p>now</p>
                </div>
              </div>
              <div className='notification-2'>
                <div>
                <img src={logo} alt=""  className='notify-logo'/>
                <p className='notify-title'>Order Accepted! <img src={tickbox} alt="" /></p>
                <p className='notify-desc'>Your order will be delivered shortly</p>
                </div>
                <div className='now'>
                  <p>now</p>
                </div>
              </div>
              <div className='notification-3'>
                <div>
                <img src={logo} alt=""  className='notify-logo'/>
                <p className='notify-title'>Your rider's nearby</p>
                <p className='notify-desc'>They're almost there - get ready!</p>
                </div>
                <div className='now'>
                  <p>now</p>
                </div>
              </div>
            </div>
          </div>
          <div className='exlusive-deal'>
            <div className='deals-header'>
              <p>
              Up to -40% 🎊 Order.uk exclusive deals
              </p>
              <div className='deals-btn'>
                <button className='vegan-btn'>
                  Vegan
                </button>
                <button className='Sushi-btn'>
                  Sushi
                </button>
                <button className='pizza-btn'>
                  <img src={next_btn} alt="" />
                  Pizza & Fast food
                </button>
                <button className='others-btn'>
                  others
                </button>
              </div>
            </div>
            <div className='deals-restaurants'>
            {images && images.restaurant && (
              <div className='restaurant-card'>
                <img src={images.restaurant.burger_cc} alt="" className='card-img'/>
                <div className='card-msg'>
                  <p className='card-title'>Restaurant</p>
                  <p className='card-desc'>Chef Burgers London</p>
                </div>
                <div className='discount-val'>
                  <p>-40%</p>
                </div>
              </div>)}
            {images && images.restaurant && (
              <div className='restaurant-card'>
                  <img src={images.restaurant.cafe_london} alt="" className='card-img'/>
                <div className='card-msg'>
                  <p className='card-title'>Restaurant</p>
                  <p className='card-desc'>Grand Ai Cafe London</p>
                </div>
                <div className='discount-val'>
                  <p>-20%</p>
                </div>
              </div>)}
            {images && images.restaurant && (
              <div className='restaurant-card'>
                <img src={images.restaurant.burger_cc} alt=""  className='card-img'/>
                <div className='card-msg'>
                  <p className='card-title'>Restaurant</p>
                  <p className='card-desc'>Butterbrot Caf’e London</p>
                </div>
                <div className='discount-val'>
                  <p>-17%</p>
                </div>
              </div>)}
            </div>
          </div>
          {images && images.popularCategories && (
            <div className='popular-categories'>
              <div className='category-header'>
                <p>Order.uk Popular Categories 🤩</p>
              </div>
              <div className='category-restaurant'>
                <div className='category-card'>
                  <img src={images.popularCategories.burger_fastfood} alt="" />
                  <p className='category-name'>Burgers & Fast food</p>
                  <p className='no-restaurant'>
                  21 Restaurants
                  </p>
                </div>
                <div className='category-card'>
                  <img src={images.popularCategories.salads} alt="" />
                  <p className='category-name'>Salads</p>
                  <p className='no-restaurant'>
                  32 Restaurants
                  </p>
                </div>
                <div className='category-card'>
                  <img src={images.popularCategories.pasta} alt="" />
                  <p className='category-name'>Pasta & Casuals</p>
                  <p className='no-restaurant'>
                  4 Restaurants
                  </p>
                </div>
                <div className='category-card'>
                  <img src={images.popularCategories.pizza} alt="" />
                  <p className='category-name'>Pizza</p>
                  <p className='no-restaurant'>
                  32 Restaurants
                  </p>
                </div>
                <div className='category-card'>
                  <img src={images.popularCategories.breakfast} alt="" />
                  <p className='category-name'>Breakfast</p>
                  <p className='no-restaurant'>
                  4 Restaurants
                  </p>
                </div>
                <div className='category-card'>
                  <img src={images.popularCategories.soups} alt="" />
                  <p className='category-name'>Soups</p>
                  <p className='no-restaurant'>
                  32 Restaurants
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <PopularRestaurants />
          {images && (
            <div className='banner-2'>
                <div className='laughing-img'>
                  <img src={images.laughing_couple} alt="" />
                </div>
                <div className='laughing-bg'>
                  <img src={images.laughing_couple} alt="" />
                </div>
                <div className='banner2-right'>
                  <div className='banner-logo'>
                    <img src={logo} alt="logo" />
                    <span>ing is more</span>
                  </div>
                  <div className='personal-msg'>
                    <p><span>
                      Personalised
                    </span>
                    & Instant</p>
                  </div>
                  <div className='banner2-msg'>
                    <p>Download the Order.uk app for faster ordering</p>
                  </div>
                  <div className='banner-download'>
                    <img src={download_img} alt="" />
                  </div>
                </div>
            </div>
          )}

          {images && (
            <div className='info-logo'>
              <div className='partner-logo'>
                <img src={images.partner_logo} alt="" />
                <div className='partner-msg'>
                  <p className='partner-title'>
                  Signup as a business
                  </p>
                  <p className='partner-desc'>
                  Partner with us
                  </p>
                  <button className='logo-btn'>
                  Get Started
                  </button>
                </div>
                <div className='top-msg'>
                  <p>Earn more with lower fees</p>
                </div>
              </div>
              <div className='partner-logo'>
                <img src={images.ride_logo} alt="" />
                <div className='partner-msg'>
                  <p className='partner-title'>
                  Signup as a rider
                  </p>
                  <p className='partner-desc'>
                  Ride with us
                  </p>
                  <button className='logo-btn'>
                  Get Started
                  </button>
                </div>
                <div className='top-msg'>
                  <p>Avail exclusive perks</p>
                </div>
              </div>
            </div>
          )}
          <div className='know-more'>
            <div className='know-nav'>
              <p className='know-title'>Know more about us!</p>
              <div className='right-nav'>
                <p className='right-title'>Frequent Questions</p>
                <p>Who we are?</p>
                <p>Partner Program</p>
                <p>Help & Support</p>
              </div>
            </div>
            <div className='about-us'>
              
              <div className='about-left'>
                <p className='work-msg'>How does Order.UK work?</p>
                <p>What payment methods are accepted?</p>
                <p>Can I track my order in real-time?</p>
                <p>Are there any special discounts or promotions available?</p>
                <p>Is Order.UK available in my area?</p>
              </div>
              <div className='about-right'>
                <div className='right-card'>
                  <div className='about-card'>
                    <p className='about-title'>Place an Order!</p>
                    <img src={order_food} alt="" />
                    <p className='about-desc'>
                    Place order through our website or Mobile app
                    </p>
                  </div>
                  <div className='about-card'>
                    <p className='about-title'>Place an Order!</p>
                    <img src={food_icon} alt="" />
                    <p className='about-desc'>
                    Place order through our website or Mobile app
                    </p>
                  </div>
                  <div className='about-card'>
                    <p className='about-title'>Place an Order!</p>
                    <img src={order_icon} alt="" />
                    <p className='about-desc'>
                    Place order through our website or Mobile app
                    </p>
                  </div>
                </div>
                <p className='about-msg'>Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!</p>
              </div>
            </div>

          </div>
          <div className='co-info'>
            <div className='rider-info'>
              <div className='rider-title'>
                546+
              </div>
              <p className='rider-desc'>
              Registered Riders
              </p>
            </div>
            <div className='straight-mark'></div>
            <div className='rider-info'>
              <p className='rider-title'>
              789,900+
              </p>
              <p className='rider-desc'>
              Orders Delivered
              </p>
            </div>
            <div className='straight-mark'></div>
            <div className='rider-info'>
              <p className='rider-title'>
              690+
              </p>
              <p className='rider-desc'>
              Restaurants Partnered
              </p>
            </div>
            <div className='straight-mark'></div>
            <div className='rider-info'>
              <p className='rider-title'>
              17,457+
              </p>
              <p className='rider-desc'>
              Food items
              </p>
            </div>
          </div>
        </div>
      
      <Footer/>
      
    </>
  );
}