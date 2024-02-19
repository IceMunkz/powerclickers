import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FaTiktok, FaTwitch, FaYoutube } from 'react-icons/fa';
import { TbBrandKick } from 'react-icons/tb';
import './about.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SocialButton from './about-components/SocialButton';

// Importing assets
import CybahImage from '../assets/cybahlogo.png';
import IceImage from '../assets/iceLogo.png';
import FatalImage from '../assets/FatalPngLogo.png';
import BainioImage from '../assets/bainioimage.jpg';
import DibzImage from '../assets/dibzimage.jpeg';

// Type definitions for better clarity and type-checking
interface Creator {
  name: string;
  creatorImage: string;
  tiktokUrl: string;
  twitchUrl: string;
  kickUrl: string;
  videoSrc: string;
}

interface Video {
  videoSrc: string;
  creatorImage: string;
}
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void; // Assuming onClose is a function that doesn't take any arguments and doesn't return anything
  videoSrc: string;
}


function Wabout() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [currentVideos, setCurrentVideos] = useState<Video[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [socialMenuState, setSocialMenuState] = useState<{ isOpen: boolean; creator?: Creator }>({ isOpen: false });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoSrc, setSelectedVideoSrc] = useState('');

  const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => {
    if (!isOpen) return null;
  
    return (
      <div className="video-modal-backdrop" onClick={onClose}>
        <div className="video-modal-content" onClick={e => e.stopPropagation()}>
          <video controls autoPlay className="video-modal-video">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  };



  useEffect(() => {
    async function fetchCreatorsAndVideos() {
      try {
        const response = await fetch('http://localhost:3000/creators');
        if (!response.ok) throw new Error('Failed to fetch creators');
        const creatorsData: Creator[] = await response.json();
        setCreators(creatorsData);

        const videos = await Promise.all(creatorsData.map(async (creator) => {
          const videosResponse = await fetch(`http://localhost:3000/videos/${creator.name}`);
          if (!videosResponse.ok) throw new Error(`Failed to fetch videos for ${creator.name}`);
          return (await videosResponse.json()).map((videoSrc: string) => ({ videoSrc, creatorImage: creator.creatorImage }));
        }));

        setCurrentVideos(videos.flat().slice(0, 4));
      } catch (error) {
        console.error('Error fetching creators and videos:', error);
      }
    }

    fetchCreatorsAndVideos();
  }, []);

  const handleButtonClick = async (creatorName: string) => {
    try {
      const response = await fetch(`http://localhost:3000/videos/${creatorName}`);
      if (!response.ok) throw new Error('Failed to fetch videos');
      const videoUrls: string[] = await response.json();

      const selectedCreator = creators.find(creator => creator.name === creatorName);
      if (!selectedCreator) throw new Error('Creator not found');

      setCurrentVideos(videoUrls.map(videoSrc => ({ videoSrc, creatorImage: selectedCreator.creatorImage })));
      setSocialMenuState({ isOpen: true, creator: selectedCreator });
    } catch (error) {
      console.error('Error fetching videos:', error);
      setSocialMenuState({ isOpen: false });
    }
  };
  const iframe_container = {
    left: 0,
              width: "100%",
              height: 500,
              position: "relative"
            }

const iframe ={top: 0,
left: 0,
width: "100%",
height: "100%",
position: "absolute",
border: 0}
  const sliderSettings = {
    className: "slider variable-width",
    dots: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    useTransform: true,
  };

  return (
    <div>
      <Slider {...sliderSettings} className="gwrapper">
        {[
          { image: CybahImage, name: 'Cybah' },
          { image: IceImage, name: 'Ice' },
          { image: FatalImage, name: 'Fatal' },
          { image: BainioImage, name: 'Bainio' },
          { image: DibzImage, name: 'Dibz' },
        ].map((creator, index) => (
          <motion.div key={index} className={`gbox ${String.fromCharCode(97 + index)}`} onClick={() => handleButtonClick(creator.name)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <img src={creator.image} alt={creator.name} className="BoxImage" />
          </motion.div>
        ))}
      </Slider>

      <div className='infobox'>
        {socialMenuState.isOpen && socialMenuState.creator && (
          <>
            <SocialButton url={socialMenuState.creator.twitchUrl} Icon={FaTwitch} />
            <SocialButton url={socialMenuState.creator.kickUrl} Icon={TbBrandKick} />
            <SocialButton url={socialMenuState.creator.tiktokUrl} Icon={FaTiktok} />
          </>
        )}
      </div>

      <div className="contentgrid">
    
        <div className="video-grid-wrapper" ref={containerRef}>
          <div className="video-grid-title">
            <div className="rainbow-text">Montages</div>
          </div>
          <div className="video-grid-container">
  {currentVideos.map((video, index) => (
    <div className="video-overlay-container" key={index}>
      <div className="video-item-container rainbow-border" onClick={() => {
        setSelectedVideoSrc(video.videoSrc);
        setIsVideoModalOpen(true);
      }}>
        <video muted className="video-item">
          
          <source src={video.videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoSrc={selectedVideoSrc} />
    </div>
  );
}

// Extracted SocialButton for reusability and cleaner code


export default Wabout;
