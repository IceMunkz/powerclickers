
import React, { useState, useEffect, useRef } from 'react';
import boopSfx from '../assets/background.mp3';
import bgaudio from '../assets/background2.mp3';
import useSound from 'use-sound';
import { useRecoilState } from 'recoil';
import { audioState } from './recoilState';

function Waudio() {
    const [isPaused, setIsPaused] = useRecoilState<boolean>(audioState);
    const [playbg, { stop: stopbg }] = useSound(bgaudio, { volume: 0.05, loop: true });
    useEffect(() => {
        if (!isPaused) {
          playbg();
        } else {
          stopbg();
        }
    
        return () => {
          stopbg();
        };
      }, [isPaused, playbg, stopbg]);
    
return (
<></>

);

}
export default Waudio