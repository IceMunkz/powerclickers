import bgvideo from "../assets/bgvideo.mp4";
import React, { useState, useEffect, useRef } from 'react';
import "./background.css";

import { useRecoilState } from 'recoil';
import { videoState } from '../state/recoilState';

function Wbackground() {
  const [bgPaused, setBGPaused] = useRecoilState<boolean>(videoState);

  useEffect(() => {
    const videoRef = document.querySelector('.video') as HTMLVideoElement;

    if (videoRef) {
      // Check the bgPaused state and play or pause the video accordingly
      if (bgPaused) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
    }
  }, [bgPaused]); // Trigger the effect whenever bgPaused changes

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video ref={videoRef} className="videobg" autoPlay loop muted
      src={bgvideo} >
    </video>
  );
}

export default Wbackground;