
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false); // New state for registration success

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const { email, password, confirmPassword } = formData;
    
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
    
        try {
            const emailCheckResponse = await axios.post('http://localhost:3000/check-email', { email });
            if (emailCheckResponse.data.isEmailRegistered) {
                setErrorMessage('Email is already registered');
                return;
            }
    
            await axios.post('http://localhost:3000/register', { email, password });
            console.log('Registration successful');
            setIsRegistrationSuccess(true); // Set registration success to true
            setErrorMessage(''); // Clear any existing error messages
            // Optionally, clear the form or handle redirection here
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.data) {
                let errorMessage = typeof axiosError.response.data === 'string' 
                    ? axiosError.response.data 
                    : JSON.stringify(axiosError.response.data);
                setErrorMessage(errorMessage);
            } else {
                console.error('Registration failed:', error);
                setErrorMessage('An unknown error occurred');
            }
        }
    };

    if (isRegistrationSuccess) {
        return (
            <div>
                <p>Registration successful! You can now log in with your credentials.</p>
                {/* Include any buttons or links for further actions here */}
            </div>
        );
    }

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
           
           <form onSubmit={handleSubmit}>
               <input
                   type="email"
                   name="email"
                   placeholder="Email"
                   value={formData.email}
                   onChange={handleInputChange}
                   required
               />
               <input
                   type="password"
                   name="password"
                   placeholder="Password"
                   value={formData.password}
                   onChange={handleInputChange}
                   required
               />
               <input
                   type="password"
                   name="confirmPassword"
                   placeholder="Confirm Password"
                   value={formData.confirmPassword}
                   onChange={handleInputChange}
                   required
               />
               <button type="submit">Register</button>
           </form>
           
       </div>
            
    );
};

export default Register;

