import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { toggleSidebar } from '../interface/interfaceSlice';

const NavBarDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1100px;
  height: 50px;
  background-color: purple;
  cursor: pointer;
`

function NavBar() {
  const dispatch = useDispatch();
  
  function clickQualities() {
    dispatch(toggleSidebar())
  }

  return (
    <NavBarDiv onClick={clickQualities}>

    </NavBarDiv>
  )
}

export default NavBar;