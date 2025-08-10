import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AppIcon = ({ size = 56 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <DotLottieReact
        src="https://lottie.host/5c89451f-84b5-4462-8348-d74cdd64bb2b/i7s89tnzph.lottie"
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default AppIcon;
