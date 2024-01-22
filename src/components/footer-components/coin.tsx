


import { motion, useAnimation } from 'framer-motion';
import insertImage from "./insert.png"
import useSound from 'use-sound'; // Importing for Sounds
import './coin.css'


function Wcoin() {
  const controls = useAnimation(); // Initialize animation controls

    return (<div> <motion.img
        src={insertImage}
        className="coin"
        alt="Insert Coin"
        animate={controls} // Use animation controls
        onHoverStart={() => controls.start({ opacity: 1, transition: { duration: 0.5 } })}
        onHoverEnd={() => controls.start({ opacity: 0.3, transition: { repeat: Infinity, duration: 0.5 } })}
        drag
        dragSnapToOrigin={true}
        dragElastic={50}
      />
    </div>
    
    );
  }

export default Wcoin;