import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { toggleSidebar, setSidebarDisplay, selectInterface } from '../interface/interfaceSlice';
import { navbar, navbarAccent, navbarHighligt } from '../style/colors';
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
  transition: all .2s ease;
  & ~ & {
    margin-left: 10px;
  }
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
  :hover {
    border: 2px solid ${navbarHighligt};
    color: ${navbarHighligt}
  }
`


function NavBar() {
  const dispatch = useDispatch();
  const interfaceState = useSelector(selectInterface);

  function clickSidebar() {
    dispatch(toggleSidebar())
  }

  function clickQualities() {
    dispatch(setSidebarDisplay('qualities'))
    if (!interfaceState.sidebar) dispatch(toggleSidebar())
  }

  function clickTravel() {
    dispatch(setSidebarDisplay('travel'))
    if (!interfaceState.sidebar) dispatch(toggleSidebar())
  }

  return (
    <NavBarDiv>
      <NavbarButton onClick={clickSidebar}><Title>S</Title></NavbarButton>
      <NavbarButton onClick={clickQualities}><Title>Q</Title></NavbarButton>
      <NavbarButton onClick={clickTravel}><Title>T</Title></NavbarButton>
    </NavBarDiv>
  )
}

export default NavBar;