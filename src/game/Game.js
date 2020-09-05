import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setQualities } from '../qualities/qualitySlice';
import QualitiesAPI from '../utilities/QualitiesAPI';
//import GameAPI from '../utilities/GameAPI';
import Sidebar from '../interface/Sidebar';
import NavBar from '../interface/NavBar';
import Domain from '../domain/Domain';
import Tooltip from '../tooltip/Tooltip';
import background from '../assets/backgrounds/ripples.png';

const GameDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
  background-color: #fff;
  min-height: 100vh;
  padding: 20px 20px 60px 20px;
  background: url(${background});
`

function Game() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  //Get qualities from API (new game) or local storage (continued game)
  useEffect(() => {
    //const gameData = GameAPI.loadGame();
    //if (gameData) dispatch(setQualities(gameData));
    //else {
    
    
    
    const startingQualities = QualitiesAPI.getStarting();
    dispatch(setQualities(startingQualities));
    setLoaded(true);
  }, [dispatch]);

  if(loaded) {
    return (
      <GameDiv>
        <NavBar />
        <Sidebar />
        <Domain />
        <Tooltip />
      </GameDiv>
    )
  }
  return "Loading.";
}

export default Game;