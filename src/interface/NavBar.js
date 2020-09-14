import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { toggleSidebar } from '../interface/interfaceSlice';
import { navbar, navbarAccent } from '../style/colors';
import { Title } from '../style/typography';

const NavBarDiv = styled.div`
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 1050px;
  height: 45px;
  background-color: ${navbar};
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;
`

const NavbarButton = styled.div`
  position: relative;
  text-align: center;
  border: 2px solid ${navbarAccent};
  height: 35px;
  width: 55px;
  border-radius: 2px;
  color: ${navbarAccent};
  flex: 0 1 auto;
  cursor: pointer;
  & ~ & {
    margin-left: 10px;
  }
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`


function NavBar() {
  const dispatch = useDispatch();
  
  function clickQualities() {
    dispatch(toggleSidebar())
  }

  return (
    <NavBarDiv>
      <NavbarButton onClick={clickQualities}><Title>S</Title></NavbarButton>
      <NavbarButton><Title>Q</Title></NavbarButton>
    </NavBarDiv>
  )
}

export default NavBar;