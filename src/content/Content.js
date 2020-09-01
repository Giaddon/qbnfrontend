/** Displays the text and choices that derive from the selected storylet. */

import React from 'react';
import styled from 'styled-components';

import ChoiceList from './ChoiceList';

const ContentDiv = styled.div`
  flex: 0 1 auto;
  width: 320px;
  padding: 10px;
  min-height: 100vh;
  font-size: 1.3em;
`

function Content({text="Unknown content", choices=null}) {
  
  if (!choices || choices.length < 1) {
    return (
      <ContentDiv>
        <p>No story active.</p>
      </ContentDiv>
    ); 
  }

  return (
    <ContentDiv>
      <p>{text}</p>
      <ChoiceList choices={choices} />
    </ContentDiv>
  );
}

export default Content;