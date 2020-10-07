import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  selectQualities,
  selectDiscoveredActions, 
  selectDiscoveredDomains,
  setDiscoveredActionsByDomainId, 
  setAllQualities, 
  selectSelectedAction, 
  setSelectedAction, discoverDomain, selectPlayer, setPlayer 
} from '../redux/playerSlice';
import QualitiesAPI from '../utilities/QualitiesAPI';
import Sidebar from '../interface/Sidebar';
import NavBar from '../interface/NavBar';
import Tooltip from '../tooltip/Tooltip';
import DomainsAPI from '../utilities/DomainsAPI';
import ContextsAPI from '../utilities/ContextsAPI';
import {
  selectDomain,
  setActiveDomain, 
  setActiveContext, 
  possibleActionDiscovered, 
  setEvents, selectEvents, setActiveEvent, setCamera
} from '../redux/domainSlice';
import ActionFunctions from '../utilities/ActionFunctions';
import Stage from './stage/Stage';
import EventsAPI from '../utilities/EventsAPI';
import EventFunctions from '../utilities/EventFunctions';
import darkBackground from '../assets/backgrounds/stagebackground.png';
import QualityPage from '../qualities/QualityPage';
import { selectInterface } from '../interface/interfaceSlice';
import GameAPI from '../utilities/GameAPI';

const GameDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  max-width: 1075px;
  min-height: 100vh;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  background: url(${darkBackground});
`

function Game() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const qualities = useSelector(selectQualities);
  const selectedAction = useSelector(selectSelectedAction);
  const discoveredActions = useSelector(selectDiscoveredActions);
  const discoveredDomains = useSelector(selectDiscoveredDomains);
  const domain = useSelector(selectDomain);
  const events = useSelector(selectEvents);
  const playerData = useSelector(selectPlayer);
  const [qualitiesChanged, setQualitiesChanged] = useState(false);
  const interfaceState = useSelector(selectInterface);

  //Get qualities from API (new game) or local storage (continued game)
  useEffect(function startGame() {
    const gameData = GameAPI.loadGame();
    if (gameData) {
      dispatch(setPlayer(gameData));
    } 
    else {
      const startingQualities = QualitiesAPI.getStarting();
      dispatch(setAllQualities(startingQualities));
    
      const startingDomains = DomainsAPI.getStartingDomains();
      startingDomains.forEach(d => dispatch(discoverDomain({id: d.id, name: d.title})))

      let data = localStorage.getItem("data")
      if (data) {
        data = JSON.parse(data);
        data.autosave = data.autosave === false ? false : true;
        data = JSON.stringify(data);
        localStorage.setItem("data", data);
      } else {
        data = {source: "server", autosave: true}
        data = JSON.stringify(data);
        localStorage.setItem("data", data);
      }
    }
    const events = EventsAPI.getAllEvents();
    dispatch(setEvents(events));
    setLoaded(true);
  }, [dispatch]);

  //This effect prevents the next effect when running just when domain state is changed.
  useEffect(() => {
    setQualitiesChanged(true);
  }, [qualities])

  //This effect runs when qualities change, and decides what to do about it.
  useEffect(function processQualityChange() {
    if(qualitiesChanged) {
      
      //Check for events triggered by the new quality state.
      const allEvents = Object.values(events);
      
      const triggeredEvent = EventFunctions.evaluateEvents(allEvents, qualities);
      if (triggeredEvent) {
        const { availableActions, lockedActions } = 
        ActionFunctions.selectStaticActions(triggeredEvent.staticActions, qualities);
        triggeredEvent.lockedActions = lockedActions;
        triggeredEvent.availableActions = availableActions;
        dispatch(setActiveEvent(triggeredEvent))
        if (domain.activeReport) dispatch(setCamera("report"));
        else dispatch(setCamera("event"));
      } else {
        dispatch(setActiveEvent(null));
      }

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
      
      //If discoverable, add to player's discovered domains
      if (newDomain.discoverable) {
        if (!discoveredDomains[newDomain.id]) {
          dispatch(discoverDomain({id: newDomain.id, name: newDomain.title}))
        }
      }

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

  }, [
    qualities, 
    events, 
    domain.activeContext, 
    domain.activeDomain,
    domain.activeReport, 
    qualitiesChanged, 
    discoveredActions, 
    dispatch,
    discoveredDomains,
    playerData]);

  useEffect(function autosave() {
      GameAPI.saveGame(playerData);

  }, [playerData])
  
  useEffect(function consumeSelectAction() {
    if (selectedAction) {
      if (selectedAction.clickType === "dismiss") { 
        const dismissedAction = domain.activeDomain.discoveredActions.filter(a => a.id === selectedAction.id)[0];
        const newDiscoveredActions = domain.activeDomain.discoveredActions.filter(a => a.id !== selectedAction.id);
        const remainingPossibleActions = [...domain.activeDomain.possibleActions, dismissedAction] 

        dispatch(setDiscoveredActionsByDomainId({domainId: domain.activeDomain.id, actions: newDiscoveredActions}));
        dispatch(possibleActionDiscovered({remainingPossibleActions, newDiscoveredActions}));
        dispatch(setSelectedAction(null));
      }  
    }


  }, [dispatch, domain, selectedAction])

  let mainDisplay;

  if (interfaceState.mainDisplay === 'story') mainDisplay = <Stage />;
  if (interfaceState.mainDisplay === 'qualities') mainDisplay = <QualityPage />;

  if(loaded) {
    return (
      <GameDiv>
        <Sidebar />
        {mainDisplay}
        <NavBar />
        <Tooltip /> 
      </GameDiv>
    )
  }
  
  return "Loading.";
}

export default Game;