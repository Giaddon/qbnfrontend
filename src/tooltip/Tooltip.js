import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { TooltipText } from '../typography/typography';

const TooltipDiv = styled.div.attrs(props => ({
  style: {
    left: props.x || "0px",
    top: props.y || "0px",
  },
}))` 
  position: absolute; 
  background-color: #fff;
  max-width: 200px;
  padding: .5em;
  pointer-events:none;
  border: 4px double #000;
  white-space: pre-wrap;
`;

function Tooltip({text, visible, x, y }) {
  if (visible) {
    return (
      <TooltipDiv x={x} y={y}>
        <TooltipText>{text}</TooltipText>
      </TooltipDiv>
    ) 
  } else return null;
  
}

function mapStateToProps(state) {
  const {text, visible, x, y} = state.tooltip;
  return { 
    text,
    visible,
    x,
    y,
  }
}

export default connect(mapStateToProps)(Tooltip);