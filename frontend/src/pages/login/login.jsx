import '../../styles/login.css'
import Footer from '../../components/Footer/Footer';
import { register_img, logo } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../utils';
import toast from 'react-hot-toast';


export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({
    email: null,
    password: null,
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    let errors = false;
    setFormError((formError)=> { return {...formError, email: null, password: null}})

    if(!formData.email || formData.email.length < 1 || !formData.email.includes("@") || !formData.email.includes(".")){
      setFormError((formError)=> { return {...formError, email: "Email is invalid"}})
      errors = true
    }
    if(!formData.password){
      setFormError((formError)=> { return {...formError, password: "Password is required"}})
      errors = true
    }
    if(errors){
      return
    }

    try {
      setLoading(()=> true);
      const response = await login(formData);
      toast.success(response.message);

      if(response.token){
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('userName', response.userName);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(()=> false);
    }
  }

  return (
    <>
      <div className="container-login">
            <div className="left-section-login">
              <div className="header-login">
                <img src={logo} alt="" />
              </div>
              <div className="login-div">
                <div className="heading-login">
                  <span>Welcome Back 👋</span>
                  <p>Today is a new day. It's your day. You shape it. <br /> 
                  Sign in to start ordering.</p>
                </div>
                
                  <form className='form-login' onSubmit={handleLogin}>
                    
                    <div className='input-container-login'>
                      <label>Email</label>
                      <input type="text" placeholder="emaxple@gmail.com" onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                      {formError.email && <p className='error'>{formError.email}</p>}
                    </div>
                    <div className='input-container-login'>
                      <label>Password</label>
                      <input type="password" placeholder="Password" onChange={(e)=> setFormData({...formData, password: e.target.value})}/>
                      {formError.password && <p className='error'>{formError.password}</p>}
                    </div>
                    
                    <button type='submit'>{loading ? 'Loading...' : 'Sign In'}</button>

                    <div className='signup-login'>
                      <span>Don't you have an account?</span>
                      <Link to="/register">Sign Up</Link>
                    </div>
                  </form>
                
              </div>
            </div>
            <div className="right-section-login">
              <img src={register_img} alt="" />
            </div>
      </div>
      <Footer/>
    </>
  )
}