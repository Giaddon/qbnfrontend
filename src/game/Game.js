import React from 'react';
import styled from 'styled-components';

import StoryletList from '../storylets/StoryletList';
import Domain from '../domain/Domain';

const GameDiv = styled.div`
  flex: 1 1 100%;
`

function Game() {

  return (
    <GameDiv>
      <Domain />
      <StoryletList />
    </GameDiv>
  )
}

export default Game;