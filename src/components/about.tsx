import React, { useEffect, useState } from 'react';
import './about.css'
import aboutimg from '../assets/aboutimg.png';
import videxample from '../assets/videoload.mp4';
import fatal from '../assets/fatal.mp4'
import cybah from '../assets/cybah.mp4'
import ice from '../assets/ice.mp4'

import Randomimage from '../assets/cybahlogo.png'
import Cybahimage from '../assets/cybahlogo.png'
import Iceimage from '../assets/iceLogo.png'
import Fatalimage from '../assets/FatalPngLogo.png'

function Wabout() {
  const imageSizebox: React.CSSProperties = {
    width: '400px',
  };
  

  const [isGalleryMounted, setIsGalleryMounted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  

  const handleButtonClick = (index: number) => {
    setCurrentVideoIndex(index);
    const aboutvideo = document.querySelector('.bboutvid') as HTMLVideoElement;
    aboutvideo.src = aboutvideoSources[index];
  };

  const aboutvideoSources = [videxample, cybah, ice, fatal, videxample];

  return (
    <div>
            <div className="gwrapper">
        <button className="gbox a" onClick={() => handleButtonClick(0)}>
          <img src={aboutimg} alt="Image A" className='BoxImage'  />
        </button>
        <button className="gbox b" onClick={() => handleButtonClick(1)}>
          <img src={Cybahimage} alt="Image B" className='BoxImage'  />
        </button>
        <button className="gbox c" onClick={() => handleButtonClick(2)}>
          <img src={Iceimage} alt="Image C" className='BoxImage'  />
        </button>
        <button className="gbox d" onClick={() => handleButtonClick(3)}>
          <img src={Fatalimage} className='BoxImage' alt="Image D" />
        </button>
        <button className="gbox e" onClick={() => handleButtonClick(4)}>
          <img className='BoxImage' src={aboutimg} alt="Image E"   />
        </button>
      </div>
        <div className='bwrapper'>
          <div className='bbouttext'>
            <video className='bboutvid' autoPlay controls muted loop src={aboutvideoSources[currentVideoIndex]}></video>
          </div>
        </div>
      <div className='wabout'>
      
        <div className='atextwrapper'>
        <img src={aboutimg} className='aboutimg' style={imageSizebox} />
          <div className='abouttext'>
            <h2>Welcome to Our Gaming Haven 🎮</h2>
            <p>
              At PowerClickers, we're not just gamers; we're a family brought together by our love for gaming, a shared fondness for cats, and an undeniable passion for dominating the virtual realms.
            </p>
            <p>
              Because gaming is more fun when you're surrounded by friends who share your passion. 🚀🐾
            </p>
          </div>
        </div>
        </div>

      </div>

    
  );
}

export default Wabout;
