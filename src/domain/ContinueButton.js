import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { SidebarTitle } from '../typography/typography';
import { clearActiveReport } from '../domain/domainSlice';
import { green } from '../typography/colors';

const ContinueButtonDiv = styled.div`
  background-color: ${green};
  float: right;
  color: white;
  width: 130px; 
  text-align: center;
  padding: 2px;
  cursor: pointer;
`;

function ContinueButton() {
  const dispatch = useDispatch();
  
  function clickContinue() {
    dispatch(clearActiveReport());
  }

  return (
    <ContinueButtonDiv onClick={clickContinue}>
      <SidebarTitle>Continue &#8614;</SidebarTitle>
    </ContinueButtonDiv>
  )
}

export default ContinueButton;