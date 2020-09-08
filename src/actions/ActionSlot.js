import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Title } from '../typography/typography';
import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';

const ActionSlotDiv = styled.div`
  border-top: 1px solid #000;
  max-width: 400px;
  text-align: center;
  border-bottom: 1px solid #000;
  padding: 1.0em 0.5em;
  margin: 1.5em auto;
  transition: border .2s ease;
  cursor: pointer;
  &:hover {
    border-top: 1px solid gold;
    border-bottom: 1px solid gold;
  }
  p {
    font-size: 3.0em;
  }
`

function ActionSlot({ selectSlot, tooltip="Select to discover a new action." }) {
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