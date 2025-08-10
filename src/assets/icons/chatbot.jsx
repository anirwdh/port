import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ChatbotIcon = ({ size = 56 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <DotLottieReact
        src="https://lottie.host/2832d1e1-070d-47cf-b6aa-3883fe1390b5/6OlVBXjuxZ.lottie"
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ChatbotIcon;
