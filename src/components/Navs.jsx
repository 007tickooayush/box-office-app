import React from 'react';
import { useLocation } from 'react-router';
import { NavList, LinkStyled } from './Navs.styled';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => {
  const location = useLocation();
  // log the location of the components being displayed/processed
  // console.log(location);

  return (
    <NavList>
      {LINKS.map(item => (
        <li key={item.to}>
          {/* using custom style Link rather than default Link structure */}
          <LinkStyled
            to={item.to}
            className={item.to === location.pathname ? 'active' : ''}
          >
            {item.text}
          </LinkStyled>
        </li>
      ))}
    </NavList>
  );
};

export default Navs;
