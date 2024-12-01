import '../../styles/orderSuccessPage.css';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function OrderSuccessPage() {

  const navigate = useNavigate();
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
          <p>Royal Cheese Burger</p>
          <p>Potato Veggies</p>
          <p>Coke Coca Cola</p>
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