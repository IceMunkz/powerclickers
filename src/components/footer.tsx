
import Container from 'react-bootstrap/Container';
import "./footer.css"
import React, { useRef, useEffect } from 'react';
import Wcoin from './footer-components/coin';

import 'bootstrap/dist/css/bootstrap.min.css';
import footerimg from '../assets/snailfooter.png'





function Wfooter() {
  

    return (

      <div className='footer'>
  
    <div className='footercontainer'>
      
<img src={footerimg} 
className='footerimg'/>



</div>

</div>
    
    
    );
  }

export default Wfooter;