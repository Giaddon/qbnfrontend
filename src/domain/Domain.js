import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Title, Text } from '../typography/typography';
import { setActiveDomain, selectDomain } from './domainSlice';
import { selectQualities } from '../qualities/qualitySlice';
import DomainsAPI from '../utilities/DomainsAPI'; 
import ActionList from '../actions/ActionsList';
import BackButton from './BackButton';
import ContinueButton from './ContinueButton';
import OutcomesList from './OutcomesList';

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
  const dispatch = useDispatch();
  const domain = useSelector(selectDomain);
  const qualities = useSelector(selectQualities);

  useEffect(() => {
    const currentDomainId = qualities.domain.value;
    const selectedDomain = DomainsAPI.getDomainById(currentDomainId);
    dispatch(setActiveDomain(selectedDomain));
  },[qualities, dispatch])

  if (domain.activeReport) {
    return (
      <DomainDiv>
        <HeaderDiv>
          <Title>{domain.activeReport.title}</Title>
          <Text>{domain.activeReport.description}</Text>
        </HeaderDiv>
        <OutcomesList />
        <ContinueButton />
      </DomainDiv>
    )
  }

  if (domain.activeStorylet) {
    return (
      <DomainDiv>
        <HeaderDiv>
          <Title>{domain.activeStorylet.title}</Title>
          <Text>{domain.activeStorylet.description}</Text>
        </HeaderDiv>
        <ActionList />
        <BackButton />
      </DomainDiv>
    )
  }

  if (domain.activeDomain) {
    return (
      <DomainDiv>
        <HeaderDiv>
          <Title>{domain.activeDomain.title}</Title>
          <Text>{domain.activeDomain.description}</Text>
        </HeaderDiv>
        <ActionList />
      </DomainDiv>
    )
  }

  return "Loading."
}

export default Domain;
