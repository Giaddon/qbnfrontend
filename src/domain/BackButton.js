import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {SidebarTitle } from '../typography/typography';
import { clearActiveStorylet } from '../domain/domainSlice';

const BackButtonDiv = styled.div`
  background-color: tomato;
  color: white;
  width: 100px; 
  text-align: center;
  padding: 2px;
  cursor: pointer;
`;

function BackButton() {
  const dispatch = useDispatch();
  
  function clickBack() {
    dispatch(clearActiveStorylet());
  }

  return (
    <BackButtonDiv onClick={clickBack}>
      <SidebarTitle>&#8612; Back</SidebarTitle>
    </BackButtonDiv>
  )
}

export default BackButton;