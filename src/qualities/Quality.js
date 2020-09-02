/** Displays a quality name and value. */

import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';
import { Subtitle, Text } from '../typography/typography';

const QualityDiv = styled.div`
  flex: 1 0 100%;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 0.3em 0.5em;
  margin: 0.5em 0;
  p:nth-child(2) {
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
      onMouseMove={(e) => dispatch(showTooltip({text:`${name} - ${value}.\n${tooltip}`, x: e.pageX, y: e.pageY}))}
      onMouseLeave={() => dispatch(hideTooltip())}
    >
        <Subtitle>{name} &bull; {value}</Subtitle>
        <Text>{description}</Text>
    </QualityDiv>
  );
}

export default Quality; 