import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  selectQualities,
  selectDiscoveredActions, 
  setDiscoveredActionsByDomainId, 
  setAllQualities 
} from '../player/playerSlice';
import QualitiesAPI from '../utilities/QualitiesAPI';
import Sidebar from '../interface/Sidebar';
import NavBar from '../interface/NavBar';
import Tooltip from '../tooltip/Tooltip';
import DomainsAPI from '../utilities/DomainsAPI';
import ContextsAPI from '../utilities/ContextsAPI';
import { selectDomain, setActiveDomain, setActiveContext, } from '../domain/domainSlice';
import ActionFunctions from '../utilities/ActionFunctions';
import Stage from '../domain/Stage';

const GameDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: 1200px;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
`

function Game() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const qualities = useSelector(selectQualities);
  const discoveredActions = useSelector(selectDiscoveredActions);
  const domain = useSelector(selectDomain);
  const [qualitiesChanged, setQualitiesChanged] = useState(false);

  //Get qualities from API (new game) or local storage (continued game)
  useEffect(function startGame() {
    //const gameData = GameAPI.loadGame();
    //if (gameData) dispatch(setQualities(gameData));
    //else {
    const startingQualities = QualitiesAPI.getStarting();
    dispatch(setAllQualities(startingQualities));
    
    setLoaded(true);
  }, [dispatch]);

//This effect prevents the next affect when running just when domain state is changed.
useEffect(() => {
  setQualitiesChanged(true);
}, [qualities])

//This effect runs when qualities change, and decides what to do about it.
useEffect(function processQualityChange() {
  if(qualitiesChanged) {
    
    // If the player is changing domains.
    // if(domain.activeDomain && (qualities.domain.value !== domain.activeDomain.id)) { 
    //   dispatch(setActiveDomain())
    // }

    // If there's an active context
    if (domain.activeContext) {
      // Update actions there.
      const { availableActions, lockedActions } = 
      ActionFunctions.selectStaticActions(domain.activeContext.staticActions, qualities);
    
      let newContext = ContextsAPI.getContextById(domain.activeContext.id);
      newContext.availableActions = availableActions;
      newContext.lockedActions = lockedActions;
      
      dispatch(setActiveContext(newContext));
    }

    // Always update actions for domain
    let newDomain = DomainsAPI.getDomainById(qualities.domain.value);
    const { availableActions, lockedActions } = 
      ActionFunctions.selectStaticActions(newDomain.staticActions, qualities);
    
    if (newDomain.dynamicActions && newDomain.dynamicActions.length > 0) {
      const { possibleActions } = 
      ActionFunctions.selectDynamicActions(newDomain.dynamicActions, qualities);
      newDomain.possibleActions = possibleActions;
    }

    newDomain.availableActions = availableActions;
    newDomain.lockedActions = lockedActions;
    
    if (discoveredActions[newDomain.id]) {
      const { possibleActions } = ActionFunctions.selectDynamicActions(discoveredActions[newDomain.id], qualities) 
      if (possibleActions) {
        const foundActions = new Set(possibleActions.map(a => a.id));
        if (newDomain.possibleActions) {
          newDomain.possibleActions = newDomain.possibleActions.filter(a => !foundActions.has(a.id));
        }
        newDomain.discoveredActions = possibleActions;
        dispatch(setDiscoveredActionsByDomainId({domainId: newDomain.id, actions: possibleActions}));
      } else {
        dispatch(setDiscoveredActionsByDomainId({domainId: newDomain.id, actions: null}));
      }
    }
    
    dispatch(setActiveDomain(newDomain));
    setQualitiesChanged(false);
  }

}, [qualities, domain.activeContext, domain.activeDomain, qualitiesChanged, discoveredActions, dispatch]);




  if(loaded) {
    return (
      <GameDiv>
        <Sidebar />
        <Stage />
        <NavBar />
        <Tooltip /> 
      </GameDiv>
    )
  }
  
  return "Loading.";
}

export default Game;