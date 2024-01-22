import bgvideo from "../assets/bgvideo.mp4";
import React, { useState, useRef, useEffect } from 'react';
import "./splash.css"
import boopSfx from '../assets/background.mp3';
import bgaudio from '../assets/background2.mp3';
import useSound from 'use-sound'; // Import ExposedData type
import Wcoin from "./footer-components/coin";

 
  const Wsplash: React.FC = ({ onClose }) => {
    const [playbg, { stop: stopbg }] = useSound(bgaudio, { volume: 0.05, loop: true });
    const [play, { stop: stopBoop }] = useSound(boopSfx);

  
    useEffect(() => {
      playbg();
      return () => stopbg();
    }, [playbg, stopbg]);
  


    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isVideoPlaying, setVideoPlaying] = useState(true);

    const toggleVideo = () => {
        if (isVideoPlaying) {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }
        setVideoPlaying(!isVideoPlaying);
    };

    return (
        <div className="videocontainer">
            <div className='video'>
                <video ref={videoRef} src={bgvideo} autoPlay loop muted onClick={toggleVideo} />
            </div>
            <div className='center'><div className='coin'><Wcoin/></div></div>
        </div>
    );
}

export default Wsplash;
