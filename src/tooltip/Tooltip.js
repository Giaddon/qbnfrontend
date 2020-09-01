import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const TooltipDiv = styled.div.attrs(props => ({
  style: {
    left: props.x || "0px",
    top: props.y || "0px",
  },
}))` 
  position: absolute;  
  background-color: #fff;
  max-width: 125px;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0px 0px 25px 0px grey;
  pointer-events:none;
`;

function Tooltip({text, visible, x, y }) {
  if (visible) {
    return (
      <TooltipDiv x={x} y={y}>
        <p>{text}</p>
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