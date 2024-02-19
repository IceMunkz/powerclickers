import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bamcxplnrcjfqgronyap.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbWN4cGxucmNqZnFncm9ueWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzMTU0NDYsImV4cCI6MjAyMzg5MTQ0Nn0.HNijnRaBc50--yi7p0liYNlZMFj3NWir1M3M7gA6Mhw'
const supabase = createClient(supabaseUrl, supabaseKey)

interface FormDataType {
  email: string;
  password: string;
  
}

function Wregister() {
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [register, setRegister] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: '',
    
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};
  

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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
  
      if (error) {
        console.error('Registration failed:', error.message);
        setErrors(prevErrors => ({
          ...prevErrors,
          form: error.message || 'Registration failed. Please try again.',
        }));
      } else {
        console.log('Registration Form Validated', );
        // Redirect or handle successful registration
      }
    } else {
      console.log('Form validation failed');
    }
  };
  
   
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  return (
    <form className="form" autoComplete="off" onSubmit={handleSubmit}>
       <div className={`control block-cube block-input ${errors.email ? 'error' : ''}`}>
        Email
        <input
          name="email"
          type="email"
          placeholder={errors.email ? errors.email : 'Email'}
          onChange={handleChange}
        /></div>
      
      <div className={`control block-cube block-input ${errors.password ? 'error' : ''}`}>
        Password
        <input
          name="password"
          type="password"
          placeholder={errors.password ? errors.password : 'Password'}
          onChange={handleChange}
        />
        {/* Background elements for styling */}
      </div>
      <button className="btn block-cube block-cube-hover">
        {/* Background elements for styling */}
        <div className="text">Register</div>
      </button>
      {errors.form && <p className="error">{errors.form}</p>}
    </form>
  );
}

export default Wregister;