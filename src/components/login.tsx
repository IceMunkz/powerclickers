import React, { useState, ChangeEvent } from 'react';
import './login.scss';

interface FormDataType {
  username: string;
  password: string;
}

function Wlogin() {
    
  
    const [formData, setFormData] = useState<FormDataType>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform form submission or API request
      console.log('Form submitted:', formData);
    } else {
      console.log('Form validation failed');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear validation error when the user types
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  return (
    <form className="form" autoComplete="off" onSubmit={handleSubmit}>
 
  
  <div className={`control block-cube block-input ${errors.username ? 'error' : ''}`}>
    <input
      name="username"
      type="text"
      placeholder={errors.username ? errors.username : 'Username'}
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
  );
}

export default Wlogin;
