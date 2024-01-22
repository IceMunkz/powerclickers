import bgvideo from "../assets/bgvideo.mp4";
import React, { useState, useRef, useEffect } from 'react';
import "./background.css"
import boopSfx from '../assets/background.mp3';
import bgaudio from '../assets/background2.mp3';
import useSound from 'use-sound'; // Import ExposedData type

function Wbackground() {
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
        
            <div className='video'>
                <video ref={videoRef} src={bgvideo} autoPlay loop muted onClick={toggleVideo} />
            </div>
        
    );
}


export default Wbackground;
