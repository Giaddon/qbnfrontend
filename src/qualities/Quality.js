/** Displays a quality name and value. */

import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';

const QualityDiv = styled.div`
  flex: 1 0 100%;
  border-radius: 4px;
  border: 1px solid #000;
  padding: 5px;
`

function Quality({ 
  name="Unidentified Quality",
  description="Quality not found.", 
  value=0, 
  tooltip="Unkown quality." 
}) {
  const dispatch = useDispatch();

  return (
    <QualityDiv 
      onMouseMove={(e) => dispatch(showTooltip({text:tooltip, x: e.pageX, y: e.pageY}))}
      onMouseLeave={() => dispatch(hideTooltip())}
    >
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{value}</p>
    </QualityDiv>
  );
}

export default Quality; 