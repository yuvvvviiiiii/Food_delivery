
import '../../styles/register.css';
import Footer from '../../components/Footer/Footer';
import { register_img, logo } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../../utils';
import toast from 'react-hot-toast';

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    password: '',
  })

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({
    email: null,
    password: null,
    name: null,
    phonenumber: null,
  });

  const handleRegister = async (e) =>{

    e.preventDefault();
    let errors = false;
    setFormError((formError) => { return {...formError, email: null, password: null, name: null, phone: null} });
    if (!formData.email || formData.email.length < 1 || !formData.email.includes("@") || !formData.email.includes(".")) {
      setFormError((formError) => { return { ...formError, email: "Email is invalid" } })
      errors = true
    }
    if (!formData.name || formData.name.length === 0) {
      setFormError((formError) => { return { ...formError, name: "Name is required" } })
      errors = true
  }
  if (!formData.phonenumber || formData.phonenumber.length < 10) {
      setFormError((formError) => { return { ...formError, phonenumber: "Phone number is invalid" } })
      errors = true
  }
  if (!formData.password) {
      setFormError((formError) => { return { ...formError, password: "Password is required" } })
      errors = true
  }
  if (errors) {
      return
  }
  try {
    setLoading(()=> true);
    const response = await register(formData);
    toast.success(response.message);

    if(response.token){
      navigate('/login');
    }
  } catch (error) {
    console.log(error);
  } finally{
    setLoading(()=> false);
  }
  }

  return(
    <>
      <div className="container-register">
            <div className="left-section-register">
              <div className="header">
                <img src={logo} alt="" />
              </div>
              <div className="register-div">
                <div className="heading">
                  <span>Welcome Back 👋</span>
                  <p>Today is a new day. It's your day. You shape it. <br /> 
                  Sign up to start ordering.</p>
                </div>
                
                  <form className='form' onSubmit={handleRegister}>
                    <div className='input-container'>
                      <label>Name</label>
                      <input type="text" placeholder="eg. John A" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                      {formError.name && <p className='error'>{formError.name}</p>}
                    </div>
                    <div className='input-container'>
                      <label>Phone Number</label>
                      <input type="text" placeholder="Enter your 10 digit mobile number" onChange={(e) => setFormData({...formData, phonenumber: e.target.value})}/>
                      {formError.phonenumber && <p className='error'>{formError.phonenumber}</p>}
                    </div>
                    <div className='input-container'>
                      <label>Email</label>
                      <input type="text" placeholder="Example@email.com" onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                      {formError.email && <p className='error'>{formError.email}</p>}
                    </div>
                    <div className='input-container'>
                      <label>Password</label>
                      <input type="password" placeholder="At least 8 characters" onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                      {formError.password && <p className='error'>{formError.password}</p>}
                    </div>
                    <button type='submit' disabled={loading}>{loading? "loading..." : "Continue"}</button>

                    <div className='signin'>
                      <span>Already have an account?</span>
                      <Link to="/login">Sign In</Link>
                    </div>
                  </form>
                
              </div>
            </div>
            <div className="right-section-register">
              <img src={register_img} alt="" />
            </div>
      </div>
      <Footer/>
    </>
  );
}