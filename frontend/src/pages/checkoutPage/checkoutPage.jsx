import { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import PopularRestaurants from '../../components/PopularRestaurants/PopularRestaurants';
import '../../styles/checkoutPage.css';
import { FaArrowLeft } from "react-icons/fa6";
import { PiMapPinFill } from "react-icons/pi";
import { FaChevronRight } from "react-icons/fa6";
import { fetchOrders } from '../../utils';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage(){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    
    const getOrders = async() => {
      try {
        setLoading(true);
        const response = await fetchOrders();
        console.log(response, 'response');
        // use reduce to flatten the orders array
        const allOrders = response?.reduce((acc, current) => {
          return acc.concat(current.orders); 
        }, []);
        setOrders(allOrders);
        console.log(allOrders, 'allOrders');
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
    getOrders();
  }, []);

  const calculateTotalPrice = () => {
    if(orders){
        return orders.reduce((total, item) => {
          const itemPrice = Number(item.price.replace(/[^0-9]/g, ""));
          return total + itemPrice * item.quantity;
        }, 0)
      }
    }

  const totalPrice = calculateTotalPrice();
  
  
  if(loading){
    return <p>Loading...</p>
  }
  return (
    <>
      <Navbar/>
      <div className='checkout-container'>
        <div className='checkout-header'>
          <FaArrowLeft className='left-arrow'/>
          <p>Your Order Details</p>
        </div>
        <div className='order-summary'>
          <div className='order-items'>
            {orders && orders.map((order, index) => (
              <div className='orders' key={index}>
                <div className='item-info'>
                <img src={order?.image} alt="" className='order-image'/>
                <div className='order-text'>
                <p className='order-name'>{order?.name}</p>
                <p className='order-quantity'>{order?.quantity}x item</p>
                </div>
                </div>
               
                <div className='order-price'>
                  <p>{order?.price}</p>
                </div>
                
              </div>
            ))}
            <div className='add-notes'>
              <label>Notes</label>
              <input type="text" placeholder='Add order Notes'/>
            </div>
          </div>
          <div className='order-info'>
            <div className='delivery-section' onClick={() => navigate('/your-address')}>
              <div className='delivery-add'>
              <div className='map-pin'>
                <PiMapPinFill className='map-icon'/>
              </div>
              <div className='address-info' >
                <p>Delivery Address</p>
                <span>45, Green Street, Sector 12...</span>
              </div>
              </div>
              <FaChevronRight className='right-arrow'/>
            </div>
            <div className='horizontal-line'></div>
            <div className='add-taxes'>
              <div className='item-price'>
                <p>Items</p> 
                <span>{totalPrice}</span>
              </div>
              <div className='sales-tax'>
                <p>Sales Tax</p>
                <span>₹10</span>
              </div>
            </div>
            <div className='horizontal-line'></div>
            <div className='total-price'>
              {orders && (<p>Subtotal({orders?.length} items)</p>)}
              <span>{totalPrice + 10}</span>
            </div>
            <button className='payment-method' onClick={() => navigate('/payment')}>Choose Payment Method</button>
          </div>
        </div>
      </div>
      <PopularRestaurants/>
      <Footer/>
    </>
  )
}