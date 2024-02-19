import React from 'react';
import { IconType } from 'react-icons'; // Import type for TypeScript support if using TypeScript

interface SocialButtonProps {
    url: string;
    Icon: IconType; // Use React.ElementType if not using react-icons or for more general types
  }


  const SocialButton: React.FC<SocialButtonProps> = ({ url, Icon }) => {
    return url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button className='button-85'>
          <Icon className="social-icon-large" />
        </button>
      </a>
    ) : null;
  };
  
  export default SocialButton;