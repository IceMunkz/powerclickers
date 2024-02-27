
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authState } from '../state/authState'; // Adjust the import path as needed
import './logout.css'

const Wlogout = () => {
  const setAuthState = useSetRecoilState(authState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logout = async () => {
    // Perform any necessary logout operations first, like invalidating the session on the backend
    // Example API call to logout, adjust URL and options as needed
    const response = await fetch('http://localhost:3000/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      // Clear the token from local storage or any other client-side storage
      localStorage.removeItem('token');

      // Update the Recoil authState to false
      setAuthState({ isLoggedIn: false, user: null });

      // Optionally, redirect the user to the login page or home page
      // window.location.href = '/login'; // Adjust as necessary
    } else {
      console.error('Logout failed');
      // Handle logout failure
    }
  };

  const ConfirmationModal = () => {
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <p>Are you sure you want to logout?</p>
          <button onClick={logout}>Logout</button>
         
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </div>
    );
  };

  // If you need a button or some action to trigger logout
  return (
    <>
      {isModalOpen && <ConfirmationModal />}
      <button className="logout-button" onClick={() => setIsModalOpen(true)}>Logout</button>
    </>
  );
};

export default Wlogout;