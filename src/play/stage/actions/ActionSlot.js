import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Title } from '../../../style/typography';
import { showTooltip, hideTooltip } from '../../../tooltip/tooltipSlice';
import background from '../../../assets/backgrounds/discoveredbackground.png'

const ActionSlotDiv = styled.div`
  border-top: 1px solid #000;
  max-width: 400px;
  text-align: center;
  border-bottom: 1px solid #000;
  padding: 1.0em 0.5em;
  margin: 1.5em auto;
  transition: border .2s ease;
  cursor: pointer;
  background: url(${background});
  box-shadow: 0px 0px 14px 0px #111;
  border: 3px solid #fff;
  border-radius: 2px;
  &:hover {
    border: 3px solid gold;
  }
  p {
    font-size: 3.0em;
  }
`

function ActionSlot({selectSlot, tooltip="Select to discover a new action." }) {
  const dispatch = useDispatch();

  function clickSlot() {
    selectSlot();
  }
  
  return (
    <ActionSlotDiv 
      onClick={clickSlot}
      onMouseMove={(e) => dispatch(showTooltip({text:tooltip, x: e.pageX, y: e.pageY}))}
      onMouseLeave={() => dispatch(hideTooltip())}
    >
      <Title>+</Title>
    </ActionSlotDiv>
  )
}

export default ActionSlot;