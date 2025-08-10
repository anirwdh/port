import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AgentIcon = ({ size = 56 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <DotLottieReact
        src="https://lottie.host/33f827a0-41ee-4340-9ab6-74310127f346/dRD6bDAYeI.lottie"
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default AgentIcon;
