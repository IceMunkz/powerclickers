import React, { useState, useRef } from 'react';
import { Route,Routes } from 'react-router-dom';
import Wnav from './components/nav';
import Wfooter from "./components/footer";
import Wbackground from "./components/background";
import Wcontent from "./components/logo";
import Wabout from "./components/about";
import 'bootstrap/dist/css/bootstrap.min.css';
import Wbuttons from "./components/buttons";
import { motion, AnimatePresence } from 'framer-motion';
import Waudio from './components/audio';
import { RecoilRoot } from 'recoil';
import Wlogin from './components/login';

function Website() {

  return (
   
      <div> <RecoilRoot> {/* Recoil State Management Wrapper ''Maybe make Active Component States rather than using ReactRouter'*/}
         <Wbackground /> {/* Background Component managed by 'videoState'*/}
        <Waudio /> {/* Audio Component managed by 'audioState'*/}
         <Wnav />  {/* Nav Component */}


     
        
        <div className="center">   {/* Main Content Div 'center' */}
        <Routes>    {/* Routes for nav Links */}
        <Route
          path="/"
          element={
            <AnimatePresence>    {/* Transition animation tag for component switchs */}
              <motion.div 
                key='home'
                animate={{ x: 0 }}
                transition={{ delay: 1 }}
              >
                
                <Wcontent />
              </motion.div>
            </AnimatePresence>   
          }
        />
        <Route
          path="/about"
          element={
            <AnimatePresence>   {/* Transition animation tag for component switchs*/}
               
              <motion.div 
              key='about'
                
              animate={{ x: 0 }}
  transition={{ delay: 1 }}
              >
                <Wabout />
              </motion.div>
               
            </AnimatePresence> 
          }
          
        />
                <Route
          path="/login"
          element={
            <AnimatePresence>   {/* Transition animation tag for component switchs*/}
               
              <motion.div 
              key='login'
                
              animate={{ x: 0 }}
  transition={{ delay: 1 }}
              >
                <Wlogin />
              </motion.div>
               
            </AnimatePresence> 
          }
          
        />
        
      </Routes>
      
          
        </div>
        
        <Wbuttons /> {/* Side Nav Buttons - '''Needs work for scaling'''*/}
        <Wfooter /> {/* Footer Component '' Works fine ''*/}
        </RecoilRoot> {/* Recoil State Management Wrapper*/}
      </div>

  );
}

export default Website;

