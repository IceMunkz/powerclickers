import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Website from './App';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';

// Replace YOUR_FRONTEND_API with your actual Clerk frontend API key
const clerkFrontendApi = 'pk_test_bWVldC1zdGFyZmlzaC00My5jbGVyay5hY2NvdW50cy5kZXYk';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
      <BrowserRouter>
      <ClerkProvider publishableKey={clerkFrontendApi}>
        <Website />
        </ClerkProvider>
      </BrowserRouter>
   
  </React.StrictMode>
);



