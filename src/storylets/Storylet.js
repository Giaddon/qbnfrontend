/** Displays a storylet's name and description. Click on it to make it the active story. */

import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import DomainsAPI from "../utilities/DomainsAPI"; 
import QualitiesAPI from "../utilities/QualitiesAPI";
import { Subtitle, Text } from '../typography/typography';
import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';
import { adjustQualityByValue, setQualityToValue } from '../qualities/qualitySlice';
import { setActiveDomain, setPreviousDomain } from '../domain/domainSlice';

const StoryletDiv = styled.div`
  opacity: ${props => props.disabled ? "0.4" : "1"};
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 1.0em 0.5em;
  margin: 1.0em 0;
  cursor: ${props => props.disabled ? "default" : "pointer"};
  p:nth-child(2) {
    margin-top: 0.3em;
  }
  transition: border .2s ease;
  &:hover {
    border-top: 1px solid gold;
    border-bottom: 1px solid gold;
  }
`

function Storylet({ 
  id="Unknown Id", 
  title="Unidentified Storylet", 
  text="Unknown text", 
  tooltip="Unknown tooltip.",
  disabled=false,
  results=null}) {
  const dispatch = useDispatch();

  function selectStorylet() {
    if (!disabled) {
        if(results.qualities) {
        results.qualities.forEach(({id, value, type}) => {
          const response = QualitiesAPI.getById(id);
          const quality = {...response};
          if (type === "adjust") {
            dispatch(adjustQualityByValue({id, quality, value}) || null);
          } else if (type === "set") {
            dispatch(setQualityToValue({id, quality, value}));
          }
        });
      }
      const newDomain = DomainsAPI.getDomainById(results.domain);
      if (newDomain.canleave) dispatch(setPreviousDomain());
      dispatch(setActiveDomain(newDomain));
    }
    
  }
  
  return (
    <StoryletDiv disabled={disabled} 
      onClick={selectStorylet}
      onMouseMove={(e) => dispatch(showTooltip({text:tooltip, x: e.pageX, y: e.pageY}))}
      onMouseLeave={() => dispatch(hideTooltip())}
    >
      <Subtitle>{title}</Subtitle>
      <Text>{text}</Text>
    </StoryletDiv>
  );
}

export default Storylet; 