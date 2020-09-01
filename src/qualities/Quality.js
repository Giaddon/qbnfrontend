/** Displays a quality name and value. */

import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';

const QualityDiv = styled.div`
  flex: 1 0 100%;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 0.3em 0.5em;
  margin: 0.5em 0;
  h3 {
    font-size: 1.5em;
    font-weight: 400;
  }
  p {
    font-size: 1.3em;
    font-weight: 300;
    margin-top: 0.1em;
  }
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
      onMouseMove={(e) => dispatch(showTooltip({text:`${name} - ${value}. ${tooltip}`, x: e.pageX, y: e.pageY}))}
      onMouseLeave={() => dispatch(hideTooltip())}
    >
        <h3>{name} &bull; {value}</h3>
        <p>{description}</p>
    </QualityDiv>
  );
}

export default Quality; 