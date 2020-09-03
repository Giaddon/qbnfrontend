import React from 'react';
import styled from 'styled-components';

import Domain from '../domain/Domain';

const GameDiv = styled.div`
  flex: 1 1 100%;
`

function Game() {

  return (
    <GameDiv>
      <Domain />
    </GameDiv>
  )
}

export default Game;