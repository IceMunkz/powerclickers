import React, { useState, createContext, useContext, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeMute, FaPause } from 'react-icons/fa';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './nav.css'



function WNav() {
 
  const pulseVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };


  

  return (
    
    <nav className="mask">
      <ul className="list">
        <motion.li whileHover="hover" variants={pulseVariants}>
        <Link to="/home">Home</Link>
        </motion.li>
        <motion.li whileHover="hover" variants={pulseVariants}>
        <Link to="/about">About</Link>
        </motion.li>
        <motion.li whileHover="hover" variants={pulseVariants}>
          <Link to="/login">Login</Link>
        </motion.li>
        <motion.li whileHover="hover" variants={pulseVariants}>
          <Link to="/volume">
            <FaVolumeMute />
          </Link>
        </motion.li>
        <motion.li whileHover="hover" variants={pulseVariants}>
          <Link to="/background">
            <FaPause />
          </Link>
        </motion.li>
      </ul>
    </nav>
     
  );
}

export default WNav;
