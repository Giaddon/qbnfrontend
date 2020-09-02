/** Displays the text and choices that derive from the selected storylet. */

import React from 'react';
import styled from 'styled-components';

import ChoiceList from './ChoiceList';
import { Text } from '../typography/typography';

const ContentDiv = styled.div`
  flex: 0 1 33%;
  padding: 10px;
  min-height: 100vh;
`

function Content({text="Unknown content", choices=null}) {
  
  if (!choices || choices.length < 1) {
    return (
      <ContentDiv>
        <Text>No story active.</Text>
      </ContentDiv>
    ); 
  }

  return (
    <ContentDiv>
      <Text>{text}</Text>
      <ChoiceList choices={choices} />
    </ContentDiv>
  );
}

export default Content;