import '../../styles/orderSuccessPage.css';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchOrders } from '../../utils';

export default function OrderSuccessPage() {

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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

  if(loading) {
    return <p>Loading...</p>
  }
  return (
    <>
      <Navbar/>
      <div className="success-container">
        <div className='success-info'>
        <div className="success-img">
          <FaCircleCheck className="success-icon"/>
        </div>
        <div className="success-msg">
          <p>Order Placed Successfully</p>
          <span>Your order is confirmed and on its way. Get set to savor your chosen delights!</span>
        </div>
        <div className="order-msg">
          { orders && orders.map((order, index) => (
            <p key={index}>Royal Cheese Burger</p>
          ))}
          <button className="back-home" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}