import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeMute, FaPause } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import './nav.css';
import { authState } from '../state/authState';
import { useRecoilState } from 'recoil';
import { videoState } from '../state/recoilState';
import { audioState } from '../state/recoilState';
import './background'
function WNav() {
  const [isPaused, setIsPaused] = useRecoilState<boolean>(audioState);
  const [bgPaused, setBgPaused] = useRecoilState<boolean>(videoState);
  const [auth] = useRecoilState(authState);
  const isLoggedIn = auth.isLoggedIn; // Correct way to access isLoggedIn
  

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };
  const bgOnClick = () => {
    setBgPaused(!bgPaused)
  };
  

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
          <Link to="/">Home</Link>
        </motion.li>
        <motion.li whileHover="hover" variants={pulseVariants}>
          <Link to="/media">Media</Link>
        </motion.li>
        <motion.li whileHover="hover" variants={pulseVariants}>
          <Link to="/stats">
            Stats
          </Link>
        </motion.li>
        <motion.li whileHover="hover" variants={pulseVariants}>
          <Link to="/login">Login</Link>
        </motion.li>
      
        <motion.li whileHover="hover" variants={pulseVariants} onClick={() => togglePause()}>
          <Link to="/">
            <FaVolumeMute />
          </Link>
        </motion.li>
        <motion.li whileHover="hover" variants={pulseVariants} onClick={() => bgOnClick()}>
          <Link to="/">
            <FaPause />
          </Link>
          </motion.li>
      </ul>
    </nav>
  );
}

export default WNav;
