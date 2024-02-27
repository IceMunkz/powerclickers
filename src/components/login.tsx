import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import Register from './register';
import { useSetRecoilState, useRecoilValue } from 'recoil'; // Correct import
import { authState } from '../state/authState'; // Make sure the path is correct
import './login.scss';
import { FaDiscord } from "react-icons/fa";


const Login = () => {
  const auth = useRecoilValue(authState); // Get the current auth state
  const setAuthState = useSetRecoilState(authState); // Keep this if you need to update the state
  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    let errorTimeout: string | number | NodeJS.Timeout | undefined; // No need to type it here, TypeScript will infer

   
  

    useEffect(() => {
        return () => {
            if (errorTimeout) clearTimeout(errorTimeout);
        };
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: email.toLowerCase(),
                password,
            });
            // Assuming response.data.token is what you receive
            console.log('Login successful');
            setAuthState({ isLoggedIn: true, user: { email, token: response.data.token } });
            setErrorMessage('');
        } catch (error) {
            const axiosError = error as AxiosError;
            errorTimeout = setTimeout(() => {
                if (axiosError.response?.data) {
                    const errMessage = typeof axiosError.response.data === 'string' 
                        ? axiosError.response.data 
                        : JSON.stringify(axiosError.response.data);
                    setErrorMessage(errMessage);
                } else {
                    console.error('Login failed:', error);
                    setErrorMessage('An unknown error occurred');
                }
            }, 3000); // Adjust the time as needed
        }
    };

    const toggleRegisterModal = () => setIsRegisterModalOpen(!isRegisterModalOpen);

    return (
      <div>
        <div className='login-wrapper'>
                {auth.isLoggedIn ? (
                <div>
                    <p className="error-message">You are logged in!</p>
                </div>
            ) : (
                <>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={toggleRegisterModal}>Register</button>
                    <button onClick={() => window.location.href = 'http://localhost:3000/auth/discord'}><FaDiscord /></button>
                </>
            )}
        </div>
        {isRegisterModalOpen && (
            <>
                <div className="modal-backdrop" onClick={() => setIsRegisterModalOpen(false)}></div>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <Register />
                    <button onClick={() => setIsRegisterModalOpen(false)}>Close</button>
                    
                </div>
            </>
        )}
      </div>
    );
};

export default Login;
