import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { SidebarTitle } from '../../style/typography';
import { clearActiveReport, selectDomain, setCamera } from '../../redux/domainSlice';
import { informative, informativeAccent, highlight } from '../../style/colors';

const ContinueButtonDiv = styled.div`
  background-color: ${informative};
  float: right;
  color: white;
  width: 130px; 
  border-radius: 2px;
  border: 2px solid ${informativeAccent};
  text-align: center;
  padding: 2px;
  box-shadow: 0px 0px 10px 0px #222;
  cursor: pointer;
  margin-top: 10px;
  transition: border .2s ease;

  :hover {
    border: 2px solid ${highlight};
  }
`;

function ContinueButton() {
  const dispatch = useDispatch();
  const domain = useSelector(selectDomain);

  function clickContinue() {
    dispatch(clearActiveReport());
    if (domain.activeEvent) dispatch(setCamera("event"));
    else if (domain.activeContext) dispatch(setCamera("context"));
    else dispatch(setCamera("domain"));
    
  }

  return (
    <ContinueButtonDiv onClick={clickContinue}>
      <SidebarTitle>Continue &#8614;</SidebarTitle>
    </ContinueButtonDiv>
  )
}

export default ContinueButton;