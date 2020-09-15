import React from 'react';
import { useSelector } from 'react-redux'; 
import styled from 'styled-components';
import { selectDomain } from '../domain/domainSlice';

import { selectDiscoveredDomains } from '../player/playerSlice';
import { SidebarSubtitle, SidebarTitle } from '../style/typography';
import TravelButton from './TravelButton';

const TravelDiv = styled.div`
  text-align: center;
`


function Travel() {
  const domains = useSelector(selectDiscoveredDomains);
  const domainState = useSelector(selectDomain);
  let displayedItem;
  
  if (domainState.activeDomain.locked || domainState.activeEvent || domainState.activeReport|| domainState.activeContext?.locked  ) {
    displayedItem = <SidebarSubtitle>Travel unavailable.</SidebarSubtitle>
  }
  else {
    displayedItem = Object.entries(domains).map(([id, name]) => 
      <TravelButton key={id} id={id} name={name} />
    );  
  }

  return (
    <TravelDiv>
      <SidebarTitle>Travel</SidebarTitle>
      {displayedItem}
    </TravelDiv>
  )
}

export default Travel