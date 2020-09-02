/** Holds individual storylets or a message indicating no storylets are available.
 */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import StoryletBlock from './StoryletBlock';
import { Text } from '../typography/typography';

const StoryletListDiv = styled.div`
  flex: 0 1 auto;
  width: 320px;
  padding: 10px;
  border-right: 1px solid #000;
`

function StoryletList({ available, unavailable }) {
  function newGame() {
    localStorage.clear();
    window.location.reload();
  }
  
  if ( !available || available.length < 1) {
    return (
      <StoryletListDiv>
        <Text>No storylets available. I guess you won...?</Text>
        <button onClick={newGame}>Clear data.</button>
      </StoryletListDiv>
    ) ;
  }
  
  return (
    <StoryletListDiv>
      <StoryletBlock title="Available" storylets={available} />
      <StoryletBlock title="Unavailable" storylets={unavailable} />
    </StoryletListDiv>
  );
}

function mapStateToProps(state) {
  const { available, unavailable } = state.storylets;
  return { 
    available,
    unavailable,
  }
}

export default connect(mapStateToProps)(StoryletList);