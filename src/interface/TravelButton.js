import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import styled from 'styled-components';
import { selectDomain } from '../domain/domainSlice';

import { setDomainQuality } from '../player/playerSlice';
import { SidebarTitle } from '../style/typography';
import QualityFunctions from '../utilities/QualityFunctions';
import QualitiesAPI from '../utilities/QualitiesAPI';

const TravelButtonDiv = styled.div`
border-radius: 2px;
border: 1px solid #000;
text-align: center;
cursor: pointer;
margin-top: 10px;
padding: 6px;
`

function TravelButton({ id, name }) {
  const dispatch = useDispatch();
  const currentDomain = useSelector(selectDomain);

  function clickDomain() {
    if (currentDomain.activeDomain.id !== id) {
      let domain = QualitiesAPI.getQualityById('domain');
      domain.value = id;
      const newDomain = QualityFunctions.processAltText(domain);
      dispatch(setDomainQuality(newDomain));
    }
  }

  return (
    <TravelButtonDiv onClick={clickDomain}>
      <SidebarTitle>{name}</SidebarTitle>
    </TravelButtonDiv>
  )
}

export default TravelButton;