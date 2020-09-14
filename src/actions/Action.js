/** Displays an actions's name and description. */

import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Subtitle, ActionText } from '../style/typography';
import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';
import dynamicBackground from '../assets/backgrounds/whitediamond.png'
import background from '../assets/backgrounds/groovepaper.png'
import { neutral, highlight, forbidden, informative, text } from '../style/colors';

const ActionDiv = styled.div`
  position: relative;
  opacity: ${props => props.disabled ? "0.4" : "1"};
  background-image: ${props => props.discovered ? `url(${dynamicBackground})` : `url(${background})` };
  max-width: 600px;
  background-color: ${neutral};
  min-height: 100px;
  border-radius: 2px;
  color: ${text};
  box-shadow: 0px 0px 14px 0px #111;
  border: 3px solid #fff;
  padding: 1.5em 1.0em 4.5em 1.0em;
  margin: 1.4em auto;
  cursor: ${props => props.disabled ? "default" : "pointer"};
  white-space: pre-wrap;
  z-index: 0;
  p:nth-child(2) {
    margin-top: 0.5em;
  }
  transition: border .2s ease;
    :hover {
      ${props => props.disabled 
        ? `border: 3px solid ${forbidden};`
        : `border: 3px solid ${highlight};`
      }
       
    }
`

const DismissActionButton = styled.div`
  position: absolute;
  right: 45px;
  bottom: 5px;
  height: 35px;
  width: 35px;
  text-align: center;
  background-color: ${forbidden};
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  z-index: 1;
  p {
    position: relative;
    top: 5px;
  }
`;

const InfoBadge = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  height: 35px;
  width: 35px;
  text-align: center;
  box-shadow: 0px 0px 4px 0px darkgrey;
  background-color: ${informative};
  color: #fff;
  border-radius: 4px;
  p {
    position: relative;
    top: 5px;
  }
`

function Action({ 
  id="Unknown Id",
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
    if (!disabled) {
    selectAction(id)
    }
  }

  function clickDismiss(event) {
    event.stopPropagation();
    console.log("Dismiss discovered action");
  }

  return (
    <ActionDiv 
      disabled={disabled}
      discovered={discovered} 
      onClick={clickAction}
    >
      <Subtitle>{title}</Subtitle>
      <ActionText>{text}</ActionText>
      {discovered 
          ? <DismissActionButton onClick={clickDismiss}>
              <Subtitle>X</Subtitle>
            </DismissActionButton>
          : null
        }
      <InfoBadge
        onMouseMove={(e) => dispatch(showTooltip({text:tooltip, x: e.pageX, y: e.pageY}))}
        onMouseLeave={() => dispatch(hideTooltip())}
      >
        <Subtitle>?</Subtitle>
      </InfoBadge>
    </ActionDiv>
  );
}

export default Action; 