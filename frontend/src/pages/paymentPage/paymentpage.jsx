import '../../styles/paymentPage.css';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function PaymentPage () {

  const navigate = useNavigate();
  

  return(
    <>
      <Navbar/>
      <div className="payment-container">
        <div className="payment-header">
          <FaArrowLeft className="back-arrow"/>
          <p>Choose and Pay</p>
        </div>
        <div className="wallet-container">
          <div className="wallet">
            <div className="wallet-header">
            <div className="wallet-info">
              <div className="circle-icon">
              <FaWallet className="wallet-icon"/>
              </div>
              <div className='wallet-text'>
                <p>Wallet</p>
                <span>Available balance: ₹300</span>
              </div>
              </div>
              <FaChevronRight className="wallet-arrow"/>
            </div>
            <div className="horizontal-line"></div>
            <div className='add-card'>
              <FaPlus className="card-plus"/>
              <p>Add Debit Card</p>
            </div>
          </div>
          <div className="total-amount">
            <div className='amount-header'>
              <p>Amount to be payed</p>
              <span>₹300</span>
            </div>
            <div className='horizontal-line'></div>
            <button className='proceed-btn' onClick={()=> navigate('/payment-successful')}>Proceed Payment</button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}