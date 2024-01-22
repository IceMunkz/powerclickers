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


function Website() {
  
  return (
   
      <div>   <Wbackground />
        
         <Wnav />


     
        
        <div className="center">
        <Routes>
        <Route
          path="/home"
          element={
            <AnimatePresence>
              <motion.div
                key="content"
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
              >
                <Wcontent />
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route
          path="/about"
          element={
            <AnimatePresence>
              <motion.div
                key="about"
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
              >
                <Wabout />
              </motion.div>
            </AnimatePresence>
          }
        />
        <Route path="/cart" element={<Wbackground />} />
      </Routes>
      
          
        </div>
        
        <Wbuttons />
        <Wfooter />
      </div>

  );
}

export default Website;

