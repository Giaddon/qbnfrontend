/** Displays a list of available choices from the selected storylet. */

import React from 'react';
import styled from 'styled-components';

import Choice from './Choice';

const ChoiceListDiv = styled.div`
  display: flex
  width: 320px;
  padding: 10px;
  div:not(:first-child) {
    margin-top: 10px; 
  }
`

function ChoiceList({ choices=null }) {
  return (
    <ChoiceListDiv>
      {choices
        ? choices.map(choice => <Choice key={choice.text} text={choice.text} results={choice.results} />)
        : null
      }
    </ChoiceListDiv>
  );
}

export default ChoiceList;