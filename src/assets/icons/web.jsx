import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const WebIcon = ({ size = 56 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <DotLottieReact
        src="https://lottie.host/4e54db02-da82-4c09-86f7-9d561a1b3f1e/fHmzYIreWA.lottie"
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default WebIcon;
