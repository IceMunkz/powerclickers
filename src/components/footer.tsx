
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
  <a href="http://snaildev.uk">
<img src={footerimg} 
 
className='footerimg'/>
</a>



</div>

</div>
    
    
    );
  }

export default Wfooter;