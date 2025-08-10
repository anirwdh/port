import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const UIIcon = ({ size = 56 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <DotLottieReact
        src="https://lottie.host/c70ec068-41d8-4e8c-b8b6-989e742df77c/e65hoFZWld.lottie"
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default UIIcon;
