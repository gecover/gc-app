import React from 'react';

const Logo = ({ className = '', ...props }) => (
  <img
    src="/DALLE_LOGO.png" 
    alt="Logo"
    style={{ width: '64px', height: '64px' }}
    className={className}
    {...props}
  />
);

export default Logo;
