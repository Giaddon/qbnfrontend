/** Displays a storylet's name and description. Click on it to make it the active story. */

import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import QualitiesAPI from "../utilities/QualitiesAPI";
import { Subtitle, ActionText } from '../typography/typography';
import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';
import { adjustQualityByValue, setQualityToValue } from '../qualities/qualitySlice';
import { setActiveStorylet, setActiveReport, clearActiveStorylet } from '../domain/domainSlice';
import StoriesAPI from '../utilities/StoriesAPI';
import background from '../assets/backgrounds/spiration-light.png'

const ActionDiv = styled.div`
  opacity: ${props => props.disabled ? "0.4" : "1"};
  background-image: ${props => props.discovered ? `url(${background})` : '' };
  max-width: 600px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 1.5em 1.0em;
  margin: 1.0em auto;
  cursor: ${props => props.disabled ? "default" : "pointer"};
  white-space: pre-wrap;
  p:nth-child(2) {
    margin-top: 0.5em;
  }
  transition: border .2s ease;
  &:hover {
    ${props => props.disabled 
      ? "border-top: 1px solid tomato; border-bottom: 1px solid tomato;" 
      : "border-top: 1px solid gold; border-bottom: 1px solid gold;"
    }
  }
`

function Action({ 
  id="Unknown Id",
  type="Unknown Type", 
  title="Unidentified Action", 
  text="Unknown text", 
  tooltip="Unknown tooltip.",
  disabled=false,
  discovered=false,
  results=null,
  domainId=null,
  odds=null,
  selectAction,
  }) {
  const dispatch = useDispatch();

  function clickAction() {
    selectAction(id, type)
  }

  return (
    <ActionDiv 
      disabled={disabled}
      discovered={discovered} 
      onClick={clickAction}
      onMouseMove={(e) => dispatch(showTooltip({text:tooltip, x: e.pageX, y: e.pageY}))}
      onMouseLeave={() => dispatch(hideTooltip())}
    >
      <Subtitle>{title}</Subtitle>
      <ActionText>{text}</ActionText>
    </ActionDiv>
  );
}

export default Action; 