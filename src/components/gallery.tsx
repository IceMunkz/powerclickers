import React, { useEffect, useState } from 'react';
import videxample from '../assets/videoload.mp4';


function Wgallery() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      // Function to add videos to each grid member (box)
      function addVideosToGrid() {
        // Video sources for each box (replace with your actual video sources)
        const videoSources = [videxample, videxample, videxample, videxample, videxample];

        const boxes = document.querySelectorAll('.gbox');

        boxes.forEach((box, index) => {
          const videogal = document.createElement('video');
          videogal.src = videoSources[index]; // Use index to access the correct video source
          videogal.className = 'video-boxes';
          videogal.autoplay = true;
          videogal.loop = true;
          videogal.muted = true;

          // Append video to the box
          box.appendChild(videogal);
        });
      }

      // Call the function when the component mounts
      addVideosToGrid();

      // Update state to prevent remounting
      setIsMounted(true);
    }
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="gwrapper" >
      <button className="gbox a" >Fatal</button>
      <button className="gbox b" >Cybah</button>
      <button className="gbox c" >IceMonkey</button>
      <button className="gbox d" >Sirron</button>
      <button className="gbox e" >Dibz</button>
    </div>
  );
}

export default Wgallery;