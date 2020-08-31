/** Displays a choice from a storylet. Click on it update quality state. */

import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { adjustByAmount } from '../qualities/qualitySlice';

const ChoiceDiv = styled.div`
  flex: 1 1 auto;
  border-radius: 4px;
  border: 1px solid #000;
  padding: 5px;
`

function Choice({ text, results }) {
  const dispatch = useDispatch();

  function selectChoice() {
    Object.entries(results).forEach(([quality, value]) => {
      dispatch(adjustByAmount({quality, value}) || null);
    });
  }
  
  return (
    <ChoiceDiv onClick={selectChoice}>
      <p>{text}</p>
    </ChoiceDiv>
  );
}

export default Choice;