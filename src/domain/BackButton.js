import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import {SidebarTitle } from '../typography/typography';
import { selectDomain, leaveDomain } from '../domain/domainSlice';

const BackButtonDiv = styled.div`
  background-color: tomato;
  color: white;
  width: 70px;
  text-align: center;
  padding: 2px;
  cursor: pointer;
`;

function BackButton() {
  const dispatch = useDispatch();
  const domain = useSelector(selectDomain);

  function clickBack() {
    dispatch(leaveDomain(domain.previous));
  }

  return (
    <BackButtonDiv onClick={clickBack}>
      <SidebarTitle>Back</SidebarTitle>
    </BackButtonDiv>
  )
}

export default BackButton;