/** Displays a quality name and value. */

import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';
import { SidebarSubtitle, SidebarText } from '../style/typography';

const QualityDiv = styled.div`
  flex: 1 0 100%;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 0.3em 0.5em;
  margin: 1.0em 0;
  p:nth-child(2) {
    margin-top: 0.1em;
  }
`

function Quality({ 
  id="noidfound",
  name="Unidentified Quality",
  description="", 
  value=1,
  change=null, 
  tooltip="" 
}) {
  const dispatch = useDispatch();

  return (
    <QualityDiv 
      onMouseMove={(e) => dispatch(showTooltip({text:`${name} | ${value}.${change || change===0 ? `\n${change} change points. ${value < 50 ? (value + 1) - change : 50 - change} needed for level ${(value + 1)}.` : ""}`, x: e.pageX, y: e.pageY}))}
      onMouseLeave={() => dispatch(hideTooltip())}
    >
        <SidebarSubtitle>{name} &bull; {value}</SidebarSubtitle>
        <SidebarText>{description}</SidebarText>
    </QualityDiv>
  );
}

export default Quality; 