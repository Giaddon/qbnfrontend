import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { Title, Text } from '../typography/typography';
import { selectDomain } from '../domain/domainSlice';
import StoryletList from '../storylets/StoryletList';
import BackButton from './BackButton';

const DomainDiv = styled.div`
  padding: 15px;
  width:100%;
  background-color: white;
`
const HeaderDiv = styled.div`
  padding: 15px;
  min-height: 100px;
  border: 1px solid #000;
  background-color: inherit;
  p:nth-child(2) {
    margin-top:10px;
  }
`

function Domain() {
  const domain = useSelector(selectDomain);

  return (
    <DomainDiv>
      <HeaderDiv>
        <Title>{domain.active.title}</Title>
        <Text>{domain.active.description}</Text>
      </HeaderDiv>
      <StoryletList />
      {domain.active.canleave
        ? <BackButton />
        : null
      }
    </DomainDiv>
  )
}

export default Domain;
