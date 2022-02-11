import React from 'react';
import Navs from './Navs';
import Title from './Title';

function MainPageLayout({ children }) {
  return (
    <div>
      <Title
        title="Box Office"
        subtitle="are you lokking for a movie or an actor?S"
      />
      <Navs />
      {children}
    </div>
  );
}

export default MainPageLayout;
