

import 'bootstrap/dist/css/bootstrap.min.css';
import './buttons.css'
import discordb from "../assets/d8bit.png"
import steamb from "../assets/s8bit.png"
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Wbuttons() {
    return (<div className='buttoncontainer'>


        
          <motion.img
            src={discordb}
            alt='Discord Logo'
            className='disbutton'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
/>
      <motion.img
      src={steamb}
      alt="steam logo"
      className="steambutton"
      whileHover={{ scale: 1.2 }} // Add hover effect (scale 1.2x)
      whileTap={{ scale: 0.8 }} // Add tap effect (scale 0.8x)
      />
    

    </div>
    
    );
  }

export default Wbuttons;