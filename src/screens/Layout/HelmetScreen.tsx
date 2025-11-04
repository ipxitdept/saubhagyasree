import React from 'react';
import HeaderScreen from './HeaderScreen';
import FooterScreen from './FooterScreen';

interface HelmetScreenProps {
  children: React.ReactNode;
}

const HelmetScreen: React.FC<HelmetScreenProps> = ({ children }) => {
  return (
    <>
      {/* <HeaderScreen /> */}
      {children}
      <FooterScreen />
    </>
  );
};

export default HelmetScreen;
