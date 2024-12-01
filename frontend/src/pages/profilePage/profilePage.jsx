import '../../styles/profilePage.css'
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { profile_icon } from "../../assets";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { addCardDetails, fetchCardDetails, getUser, updateCardDetails, updateUser } from '../../utils';
import toast from 'react-hot-toast';
import { LuCreditCard } from "react-icons/lu";
import { LuPenLine } from "react-icons/lu";

export default function ProfilePage (){

  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState([]);
  const [loadingUser, setLoadingUSer] = useState(false);
  const [inputData, setInputData] = useState({
    userName: '',
    gender: '',
    emailAddress: '',
  });
  const[isModalOpen, setIsModalOpen] = useState(false);
  const[paymentMethod, setPaymentMethod] = useState({
    cardNumber: '',
    expiration: '',
    cvc: '',
    nameOnCard: ''
  });
  const [cardDetails, setCardDetails] = useState([]);
  const [cardLoading, setCardLoading] = useState(false);
  const[editMode, setEditMode] = useState(false);
  const[cardId, setCardId] = useState(null);

  const fetchUser = async()=> {
    try {
      setLoadingUSer(true);
      const response = await getUser();
      setUser(response?.user);
      setLoadingUSer(false);
    } catch (error) {
      console.log(error);
    } finally{
      setLoadingUSer(false);
    }
  }

  const getCardDetails = async() => {
    try {
      setCardLoading(true);
      const response = await fetchCardDetails();
      setCardDetails(response);
      // console.log(response);
      setCardLoading(false);
    } catch (error) {
      console.log(error);
    } finally{
      setCardLoading(false);
    }
  }
  

  useEffect(()=> {
    fetchUser();
    getCardDetails();
  }, []);

  const userName = localStorage.getItem('userName');  
  // console.log(user.map((user) => user.name), 'user');
  const handleClick = async (e) => {
    e.preventDefault();
    setIsClicked(true);
    if(isClicked){
      const response = await updateUser(inputData);
      setIsClicked(false);
      if(response){
        toast.success(response);
      } else {
        console.log('error');
      }
      setIsClicked(false);
    } 
  }
  const handleEdit = (card) => {
    setEditMode(true);
    setCardId(card?._id?.toString() || null); 
    setPaymentMethod({
      cardNumber: card?.cardNumber || '',
      expiration: card?.expiryDate || '',
      cvc: card?.cvc || '',
      nameOnCard: card?.nameOnCard || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!paymentMethod.cardNumber || !paymentMethod.expiration || !paymentMethod.cvc || !paymentMethod.nameOnCard){
        alert('All fields are required');
        return;
      }
      if(editMode){
        console.log(cardId, 'card-id');
        const response = await updateCardDetails(cardId, paymentMethod);
        if(response){
          toast.success("Payment Method Updated Successfully");
          setIsModalOpen(false);
          getCardDetails();
        }
      }else {

      const response = await addCardDetails(paymentMethod);
      if(response){
        toast.success(response);
        setIsModalOpen(false);
        getCardDetails();
        console.log(response);
      } 
      setEditMode(false);
      setPaymentMethod({
        cardNumber: '',
        expiration: '',
        cvc: '',
        nameOnCard: ''
      })
    }
    } catch (error) {
      console.log(error);
    }
  }

   

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setCardId(null);
    setPaymentMethod({
      cardNumber: '',
      expiration: '',
      cvc: '',
      nameOnCard: ''
    });
  };

 
  
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await deleteCardDetails(id);
  //     console.log(response);
  //     setCardDetails((prev) => prev.filter((card) => card._id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  if(loadingUser || cardLoading){
    return <p>Loading...</p>
  }

  return (
    <div className='profile'>
      <Navbar/>
      <div className="profile-container">
        <div className="profile-header">
          <div className='arrow-bg'><FaArrowLeft className='profile-arrow'/></div>
          <p>My Profile</p>
        </div>
        <div className="profile-section">
          <div className="profile-img">
            <div className="profilename">
              <img src={profile_icon} alt="" />
              <p>{userName}</p>
            </div>
            <button className="profile-edit" onClick={handleClick}>{!isClicked ? 'Edit' : 'Save'}</button>
          </div>
          {user && user.map((user) => (
            <div className="profile-info" key={user?._id}>
            <div className="profile-input">
              <label>Full Name</label>
              <input type="text" placeholder={`${user?.name}`} disabled={!isClicked} onChange={(e) => setInputData({...inputData, userName: e.target.value })}/>
            </div>
            <div className="profile-input">
              <label>Email Address</label>
              <input type="text" placeholder={`${user?.email}`} disabled={!isClicked} onChange={(e) => setInputData({...inputData, emailAddress: e.target.value })}/>
            </div>
            <div className="profile-input">
              <label>Gender</label>
              <input type="text" placeholder={`${user?.gender}`} disabled={!isClicked} onChange={(e) => setInputData({...inputData, gender: e.target.value })}/>
            </div>
            <div className="profile-input">
              <label>Country</label>
              <input type="text" placeholder={`${user?.country}`} disabled={!isClicked} onChange={(e) => setInputData({...inputData, country: e.target.value })}/>
            </div>
          </div>
          ))}
          <div className='horizontal-line'></div>
          <div className='saved-payment'>
            <div className="saved-header">
              <p>Saved Payment Methods</p>
            </div>
            <div className='all-cards'>
              {cardDetails && cardDetails.map((card, index) => (
                <div className='saved-card' key={index}>
                  <div className='card-icon'>
                    <LuCreditCard className='credit-card'/>
                  </div>
                  <div className='card-text'>
                    <p>{card.cardNumber}</p>
                    <span>{card.nameOnCard}</span>
                  </div>
                  <LuPenLine className='card-pen' onClick={() => handleEdit(card)}/>
                </div> 
              ))}
            <div className='add-new-card'>
              <div className='add-new-plus'  onClick={() => setIsModalOpen(true)}>
                <FaPlus className='payment-plus'/>
              </div>
              <p>Add New Card</p>
            </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
      <>
        <div className='modal-bg' onClick={() => setIsModalOpen(false)}></div>
        <div className='profile-modal'>
          <div className='modal-header'>
            <p>{editMode ? "Edit Payment Method": "Add Payment Method"}</p>
          </div>
          <div className='modal-input'>
            <div className='modal-info'>
              <label>Card Number</label>
              <input type="text" placeholder='Card Number' value={paymentMethod.cardNumber || ''} onChange={(e) => setPaymentMethod({...paymentMethod, cardNumber: e.target.value})}/>
            </div>
            <div className='modal-info'>
              <label>Expiration</label>
              <input type="text" placeholder='Expiry Date'
              value={paymentMethod.expiration || ''} onChange={(e) => setPaymentMethod({...paymentMethod, expiration: e.target.value})}/>
            </div>
            <div className='modal-info'>
              <label>CVC</label>
              <input type="text" placeholder='CVC Number' value={paymentMethod.cvc || ''} onChange={(e) => setPaymentMethod({...paymentMethod, cvc: e.target.value})}/>
            </div>
            <div className='modal-info'>
              <label>Name on Card</label>
              <input type="text" placeholder='Name' value={paymentMethod.nameOnCard || ''} onChange={(e) => setPaymentMethod({...paymentMethod, nameOnCard: e.target.value})}/>
            </div>
          </div>
          <div className='modal-footer'>
            <div className='modal-btn'>
              <button className='save-modal' onClick={handleSubmit}>Save Changes</button>
              <button className='cancel-btn' onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      </>
    )}
      
    
      <Footer/>
    </div>
  )
}