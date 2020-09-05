/** Displays a storylet's name and description. Click on it to make it the active story. */

import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import QualitiesAPI from "../utilities/QualitiesAPI";
import { Subtitle, Text } from '../typography/typography';
import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';
import { adjustQualityByValue, setQualityToValue } from '../qualities/qualitySlice';
import { setActiveStorylet, setActiveReport, clearActiveStorylet } from '../domain/domainSlice';
import StoriesAPI from '../utilities/StoriesAPI';

const ActionDiv = styled.div`
  opacity: ${props => props.disabled ? "0.4" : "1"};
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 1.0em 0.5em;
  margin: 1.0em 0;
  cursor: ${props => props.disabled ? "default" : "pointer"};
  white-space: pre-wrap;
  p:nth-child(2) {
    margin-top: 0.3em;
  }
  transition: border .2s ease;
  &:hover {
    border-top: 1px solid gold;
    border-bottom: 1px solid gold;
  }
`

function Action({ 
  id="Unknown Id",
  type="Unknown Type", 
  title="Unidentified Action", 
  text="Unknown text", 
  tooltip="Unknown tooltip.",
  disabled=false,
  results=null,
  domainId=null,
  odds=null,
  }) {
  const dispatch = useDispatch();

  function selectAction() {
    function applyResults(results) {
      let outcomes = [];
      results.qualities.forEach(({id, value, type}) => {
        const response = QualitiesAPI.getById(id);
        const quality = {...response};
        if (type === "adjust") {
          dispatch(adjustQualityByValue({id, quality, value}) || null);
          const outcome = `${quality.name} ${value > 0 ? "increased" : "decreased"} by ${value}${quality.pyramid ? " change points" : ""}.`;
          if (!quality.invisible) outcomes = [...outcomes, outcome]
        } else if (type === "set") {
          dispatch(setQualityToValue({id, quality, value}));
          const outcome = `${quality.name} now ${value}.`;
          if (!quality.invisible) outcomes = [...outcomes, outcome];
        }
        if (!results.hide) { //Set the report unless the creator wanted to hide it.
          const finalReport = {...results.report, outcomes};
          dispatch(setActiveReport(finalReport));
        }
        if (!results.remain) dispatch(clearActiveStorylet());
     });
    }
    
    if (!disabled) {
      if(type==="modify") { // Modify actions
        applyResults(results);
      } else if (type==="storylet") { // Storylet actions
        const storylet = StoriesAPI.getByDomainId(domainId, results.storylet);
        dispatch(setActiveStorylet(storylet));
      } else if (type==="challenge") { // Challenge actions
          const outcome = Math.floor(Math.random() * 101);
          if (odds < outcome) applyResults(results.success);
          else applyResults(results.failure);
      } 
      dispatch(hideTooltip()); 
    }  
  }
  
  return (
    <ActionDiv disabled={disabled} 
      onClick={selectAction}
      onMouseMove={(e) => dispatch(showTooltip({text:tooltip, x: e.pageX, y: e.pageY}))}
      onMouseLeave={() => dispatch(hideTooltip())}
    >
      <Subtitle>{title}</Subtitle>
      <Text>{text}</Text>
    </ActionDiv>
  );
}

export default Action; 