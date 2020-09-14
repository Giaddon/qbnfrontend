import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {SidebarTitle } from '../style/typography';
import { clearActiveContext, clearActiveDynamic } from '../domain/domainSlice';
import { forbidden, highlight } from '../style/colors';

const BackButtonDiv = styled.div`
  background-color: ${forbidden};
  border: 2px solid ${forbidden};
  color: white;
  width: 100px; 
  text-align: center;
  padding: 2px;
  cursor: pointer;
  border-radius: 2px;
  box-shadow: 0px 0px 10px 0px #222;
  transition: border .2s ease;

  :hover {
    border: 2px solid ${highlight};
  }
`;

function BackButton() {
  const dispatch = useDispatch();
  
  function clickBack() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    dispatch(clearActiveDynamic());
    dispatch(clearActiveContext());
  }

  return (
    <BackButtonDiv onClick={clickBack}>
      <SidebarTitle>&#8612; Back</SidebarTitle>
    </BackButtonDiv>
  )
}

export default BackButton;