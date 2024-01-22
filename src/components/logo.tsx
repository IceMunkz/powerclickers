import React, { useRef, useState} from 'react';
import './logo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import brandImage from '../assets/brand4.png';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import Wbackground from './background'
import discordb from "../assets/discord.png"
import steamb from "../assets/steam.png"
import insertImage from "../assets/insert.png"
import boopSfx from '../assets/background.mp3';
import bgaudio from '../assets/background2.mp3';
import useSound from 'use-sound'; // Import ExposedData type




function Wcontent () {
  const [play, { stop: stopBoop }] = useSound(boopSfx)

  
  return (
    <>
      
      <motion.img
        src={brandImage}
        className="brand"
        alt="Logo"
        whileHover={{ scale: 2 }}
        animate={{ rotate: [0, -5, 5, 0], transition: { duration: 1, repeat: Infinity } }}
        drag
        dragSnapToOrigin={true}
        dragElastic={50}
        onDragStart={() => play()}
        onDragEnd={() => stopBoop()}
      />
      </>
    
  );
};

export default Wcontent;