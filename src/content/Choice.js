/** Displays a choice from a storylet. Click on it update quality state. */

import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { adjustQualityByValue, setQualityToValue } from '../qualities/qualitySlice';
import { Text } from '../typography/typography';

const ChoiceDiv = styled.div`
  flex: 1 1 auto;
  border-radius: 4px;
  border: 1px solid #000;
  padding: 5px;
  cursor: pointer;
`

function Choice({ text, results }) {
  const dispatch = useDispatch();

  function selectChoice() {
   results.forEach(({quality, value, type}) => {
      if (type === "adjust") {
        dispatch(adjustQualityByValue({quality, value}) || null);
      } else if (type === "set") {
        dispatch(setQualityToValue({quality, value}));
      }
    });
  }
  
  return (
    <ChoiceDiv onClick={selectChoice}>
      <Text>{text}</Text>
    </ChoiceDiv>
  );
}

export default Choice;