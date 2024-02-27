import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Website from './App';
import './index.css';
import { RecoilRoot } from 'recoil';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
      <BrowserRouter>
      <RecoilRoot>,
    
        <Website />
        </RecoilRoot>,
      </BrowserRouter>
   
  </React.StrictMode>
);



