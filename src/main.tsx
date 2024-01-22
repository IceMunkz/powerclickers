
import React from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import Website from './App'
import './index.css'



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
    <BrowserRouter>
    <Website />
    </BrowserRouter>
  </React.StrictMode>,
)
