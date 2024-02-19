import React, { useState } from 'react';
import './login.scss';
import Wregister from './register';
import { createClient, } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient("https://bamcxplnrcjfqgronyap.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbWN4cGxucmNqZnFncm9ueWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzMTU0NDYsImV4cCI6MjAyMzg5MTQ0Nn0.HNijnRaBc50--yi7p0liYNlZMFj3NWir1M3M7gA6Mhw");

interface FormData {
  email: string;
  password: string;
}

interface ErrorState {
  email?: string;
  password?: string;
  form?: string;
}


function Wlogin() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  // Initialize formData state inside the component
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<ErrorState>({});
  const [loginStatus, setLoginStatus] = useState('');

  const toggleRegisterModal = () => setShowRegisterModal(!showRegisterModal);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: ErrorState = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
  
      if (error) {
        setLoginStatus(error.message);
        setErrors(prev => ({ ...prev, form: error.message }));
      } else if (data) {
        setLoginStatus('Please verify your email. Check your inbox for a verification link.');
      } else {
        setLoginStatus('Login successful');
        // Redirect or handle login success here
      }
    } else {
      console.log('Form validation failed');
    }
  };
  
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)
  
    if (event === 'INITIAL_SESSION') {
      // handle initial session
     
    } else if (event === 'SIGNED_IN') {
      // handle sign in event
      console.log('Signed In');
    } else if (event === 'SIGNED_OUT') {
      console.log('Signed Out');
      // handle sign out event
    } else if (event === 'PASSWORD_RECOVERY') {
      console.log('PassWord Recov');
      // handle password recovery event
    } else if (event === 'TOKEN_REFRESHED') {
      console.log('Token Updated');
      // handle token refreshed event
    } else if (event === 'USER_UPDATED') {
      console.log('User Token Changed');
      // handle user updated event
    }
  })
  
  // call unsubscribe to remove the callback
  data.subscription.unsubscribe()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <div className='login-status'>
          {loginStatus && <p className={loginStatus === 'Login successful' ? 'success' : 'error'}>{loginStatus}</p>}

          </div>
    <div className={`control block-cube block-input ${errors.email ? 'error' : ''}`}>
    <input
  name="email" // Ensure this matches the state's key
  type="text"
  placeholder={errors.email ? errors.email : 'Email'} // Display errors for email
  onChange={handleChange}
/>
    <div className="bg-top"></div>
    <div className="bg-inner"></div>
    <div className="bg-right"></div>
    <div className="bg"></div>
  </div>
  

  <div className={`control block-cube block-input ${errors.password ? 'error' : ''}`}>
    <input
      name="password"
      type="password"
      placeholder={errors.password ? errors.password : 'Password'}
      onChange={handleChange}
    />
    <div className="bg-top"></div>
    <div className="bg-inner"></div>
    <div className="bg-right"></div>
    <div className="bg"></div>
  </div>
  <button className="btn block-cube block-cube-hover">
  <div className="bg-top"></div>
  <div className="bg-inner"></div>
  <div className="bg-right"></div>
  <div className="bg"></div>
  <div className="text">Log In</div>
</button>

</form>

<div className='register-wrap'>
<button className='btn block-cube block-cube-hover' onClick={toggleRegisterModal}>Register</button></div>
{showRegisterModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <Wregister />
      <button className="modal-close" onClick={toggleRegisterModal}>Close</button>
    </div>
  </div>
)}
</div>

  );
}

export default Wlogin;
