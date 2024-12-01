import '../../styles/userAddress.css';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { FaArrowLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { useEffect, useState } from 'react';
import { addAddress, deleteAddress, fetchAddress } from '../../utils';
import toast from 'react-hot-toast';

export default function UserAddress(){

  const [formData, setFormData] = useState([{
    state: '',
    city: '',
    pincode: '',
    phonenumber: '',
    fulladdress: ''
  }]);
  const [formError, setFormError] = useState({
    state: null,
    city: null,
    pincode: null,
    phonenumber: null,
    fulladdress: null
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[address, setAddress] = useState([]);
  const[addressLoading, setAddressLoading] = useState(false);
  const[loading, setLoading] = useState(false);

  const getAddress = async() => {
    try {
      setAddressLoading(true);
      const response = await fetchAddress();
      setAddress(response);
      setAddressLoading(false);
    } catch (error) {
      console.log(error);
    } finally{
      setAddressLoading(false);
    }
  };

  useEffect(() => {  
    getAddress();
  }, [])

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const username = localStorage.getItem('userName');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = false;

    setFormError((formError) => { return {...formError, state: null, city: null, pincode: null, phonenumber: null, fulladdress: null} });
    if (!formData.state || formData.state.length < 1) {
      setFormError((formError) => { return { ...formError, state: "State is required" } })
      errors = true
    }
    if (!formData.city || formData.city.length === 0) {
      setFormError((formError) => { return { ...formError, city: "City is required" } })
      errors = true
    }
    if (!formData.pincode || formData.pincode.length < 6) {
      setFormError((formError) => { return { ...formError, pincode: "Pincode is invalid" } })
      errors = true
    }
    if (!formData.phonenumber || formData.phonenumber.length < 10) {
      setFormError((formError) => { return { ...formError, phonenumber: "Phone number is invalid" } })
      errors = true
    }
    if (!formData.fulladdress || formData.fulladdress.length === 0) {
      setFormError((formError) => { return { ...formError, fulladdress: "Full Address is required" } })
      errors = true
    }
    if (errors) {
      return
    }
    try {
      setLoading(()=> true);
      const response = await addAddress(formData);
      toast.success(response.message);
      setFormData([]);
      setIsModalOpen(false);
      await getAddress();
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(()=> false);
    }
  }

  const handleDelete = async(id) => {
    try {
      const response = await deleteAddress(id);
      toast.success(response.message);
      console.log(response.message);
      setAddress((prevAddresses) => prevAddresses.filter((address) => address._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  if(loading || addressLoading){
    return <p>Loading...</p>
  }

  return (
    <div className='main-container'>
      <Navbar/>
        <div className="address-container">
          <div className="address-header">
            <FaArrowLeft className="back-btn"/>
            <p>Your Addresses</p>
          </div>
          <div className="add-address" >
            <div className="address-section" >
              <div className="plus-sign" >
              </div>
              <FaPlus className="plus-icon" onClick={openModal}/>
              <p>Add Address</p>
            </div>

            {address && address.map((add, index) => (
            <div className="address-card" key={index}>
              <div className='user-name'>
                <p>{username}</p>
              </div>
              <div className='address-desc'>
                <p>{add.fulladdress}</p>
                <p>Phone Number: {add.phonenumber}</p>
              </div>
              <div className='edit-remove'>
                <button>Edit</button>
                <p>|</p>
                <button onClick={() => handleDelete(add._id)}>Remove</button>
              </div>
            </div>
          ))}
          </div>
          
        </div>
        {isModalOpen && (
          <>
          <div className='modal-background' onClick={closeModal}>
          </div>
          <div className='address-modal'>
            <div className="modal-add-header">
              <LuMapPin className='add-pin'/>
              <p>Add Address</p>
            </div>
            <form className='modal-form' onSubmit={handleSubmit}>
              <div className='address-form'>
              <select
                name='state'
                className='form-select'
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
              >
                <option value='' >State</option>
                <option value="New-Delhi">New-Delhi</option>
                <option value="Maharastra">Maharastra</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Delhi">Delhi</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Bihar">Bihar</option>
                <option value="Punjab">Punjab</option>
              </select>
              {formError.state && <p className='error'>{formError.state}</p>}
              <input type="text" placeholder='City/District' className='add-input' onChange={(e) => setFormData({...formData, city: e.target.value})}/>
              {formError.city && <p className='error'>{formError.city}</p>}
              <input type='text' placeholder='Pincode' className='add-input' onChange={(e) => setFormData({...formData, pincode: e.target.value})}/>
              {formError.pincode && <p className='error'>{formError.pincode}</p>}
              <input type='text' placeholder='Phone Number' className='add-input' onChange={(e) => setFormData({...formData, phonenumber: e.target.value})}/>
              {formError.phonenumber && <p className='error'>{formError.phonenumber}</p>}
              </div>
              <div className='full-address'>
                <textarea rows='5' cols='10' placeholder='Enter full address' onChange={(e) => setFormData({...formData, fulladdress: e.target.value})}/>
                  {formError.fulladdress && <p className='error'>{formError.fulladdress}</p>}
              </div>
              <button type='submit' className='save-btn'>Save</button>
            </form>
          </div>
          </>
        )}
      <Footer/>
    </div>
  )
}