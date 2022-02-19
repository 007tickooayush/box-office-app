import React,{memo} from 'react';
import { TitleWrapper } from './Title.styled';

// using memo function to optitmize and prevent  renrenderring of Title component
const Title = ({ title, subtitle }) => {
  // uncomment and remove memo(component) in export to see the rerenderring of component
  // console.log('render');

  return (
    <TitleWrapper>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </TitleWrapper>
  );
};

export default memo(Title);
