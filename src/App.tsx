import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Wnav from './components/nav';
import Wfooter from "./components/footer";
import Wbackground from "./components/background";
import Wcontent from "./components/logo";
import Wabout from "./components/about";
import 'bootstrap/dist/css/bootstrap.min.css';
import Wbuttons from "./components/buttons";
import { motion, AnimatePresence } from 'framer-motion';
import Waudio from './components/audio';
import { RecoilRoot, useRecoilState } from 'recoil';
import Wlogin from './components/login';
import 'tailwindcss/tailwind.css';
import Wleaderboard from './components/leaderboard';
import { ClerkProvider } from '@clerk/clerk-react'
import { SignedOut, SignedIn } from "@clerk/clerk-react"
import './index.css'
import { Client } from 'appwrite';
// Import Firebase auth functions
import { authState } from './state/authState';
import Profile from './components/profile';
import DiscordAuthRedirect from './components/callback';


function Website() {

  
const [auth] = useRecoilState(authState);
const isLoggedIn = auth.isLoggedIn; // Correct way to access isLoggedIn
  return (
    <div>
  
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      </style>
      {/* Background Component managed by 'videoState'*/}
     
 
      
        {/* Recoil State Management Wrapper ''Maybe make Active Component States rather than using ReactRouter'*/}
        <Wbackground />
        <Waudio /> {/* Audio Component managed by 'audioState'*/}
        <Wnav /> {/* Nav Component */}
        <div className="center">
          {/* Main Content Div 'center' */}
          <Routes>
         
            {/* Routes for nav Links */}
            <Route
              path="/"
              element={
                <AnimatePresence mode='wait'>
                  {/* Transition animation tag for component switches */}
                  <motion.div
                    key='home'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                     {/* Conditional rendering based on isLoggedIn */}
                     {!auth.isLoggedIn ? (
                    <>
                      <Wcontent />
                      <Wbuttons />
                    </>
                  ) : (

                    <div className='WelcomeMessageWrapper'>
                          <Profile />
                      
                    </div>
                  )}
                </motion.div>
                </AnimatePresence>
              }
            />
            <Route
              path="/media"
              element={
                <AnimatePresence mode='wait'>
                  {/* Transition animation tag for component switches */}
                  <motion.div
                    key='media'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Wabout />
                  </motion.div>
                </AnimatePresence>
              }
            />
            <Route
              path="/stats"
              element={
                <AnimatePresence mode='wait'>
                  {/* Transition animation tag for component switches */}
                  <motion.div
                    key='stats'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Wleaderboard/>
                  </motion.div>
                </AnimatePresence>
              }
            />
            <Route
              path="/login"
              element={
                <AnimatePresence mode='wait'>
                  {/* Transition animation tag for component switches */}
                  <motion.div
                    key='login'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <Wlogin />
                  </motion.div>
                </AnimatePresence>
              }
            />
             <Route path="/auth/success" element={<DiscordAuthRedirect />} />
          </Routes>
        </div>
         {/* Side Nav Buttons - '''Needs work for scaling'''*/}
        <Wfooter /> {/* Footer Component '' Works fine ''*/}
      
     
      {/* Recoil State Management Wrapper*/}
    </div>
  );
}

export default Website;


