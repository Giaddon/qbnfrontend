import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Title, Text } from '../style/typography';
import {
  selectDomain, 
  possibleActionDiscovered,
  setActiveContext, 
  setActiveReport,
  clearActiveContext,
  setActiveDynamicToId,
} from './domainSlice';
import {
  setQuality, 
  selectQualities, 
  removeQuality, 
  setDiscoveredActionsByDomainId,
  selectDiscoveredActions,
} from '../player/playerSlice';
import { hideTooltip } from '../tooltip/tooltipSlice';
import ActionList from '../actions/ActionsList';
import BackButton from './BackButton';
import ContinueButton from './ContinueButton';
import OutcomesList from './OutcomesList';
import QualitiesAPI from '../utilities/QualitiesAPI';
import QualityData from '../utilities/QualityFunctions';
import ContextsAPI from '../utilities/ContextsAPI';
import background from '../assets/backgrounds/groovepaper.png'
import darkBackground from '../assets/backgrounds/brushed_alu_dark.png';
import ActionFunctions from '../utilities/ActionFunctions';

const DomainDiv = styled.div`
  flex: 0 1 800px;
  background: url(${darkBackground});
  max-width: 800px;
  padding: 40px 20px 100px 20px;
  margin: 0 0;
  height: 100%;
`
const HeaderDiv = styled.div`
  padding: 15px 20px 30px 20px;
  background-color: white;
  background: url(${background});
  box-shadow: 0px 0px 14px 0px #111;
  border-radius: 2px;
  min-height: 150px;
  max-width: 750px;
  margin: 0 auto;
  p:nth-child(2) {
    margin-top:10px;
  }
  white-space: pre-wrap;
`

function Stage() {
  const dispatch = useDispatch();
  const domain = useSelector(selectDomain);
  const qualities = useSelector(selectQualities);
  const discoveredActions = useSelector(selectDiscoveredActions);

  function consumeSelectSlot() {
    const possibleActions = [...domain.activeDomain.possibleActions];
    const currentDiscoveredActions = 
      domain.activeDomain.discoveredActions ? [...domain.activeDomain.discoveredActions] : [];
    const index = Math.floor(Math.random() * possibleActions.length);
    const revealedAction = {...possibleActions[index]};

    const remainingPossibleActions = possibleActions.filter(action => action.id !== revealedAction.id);
    const newDiscoveredActions = [...currentDiscoveredActions, revealedAction]
    
    dispatch(setDiscoveredActionsByDomainId({domainId: domain.activeDomain.id, actions: newDiscoveredActions}));
    dispatch(possibleActionDiscovered({remainingPossibleActions, newDiscoveredActions}))
    dispatch(hideTooltip());

  }

  function applyActionResults(results) {
    let outcomes = [];

    for (let change of results.changes) {
      const { id, value } = change;
      let copiedQuality = qualities[id] ? {...qualities[id]} : QualitiesAPI.getQualityById(id);
      let outcome = '';
      if(!copiedQuality.value) { 
        copiedQuality.value = 0;
      } 
      if (change.type==="adjust") {
        copiedQuality.value += value;
        if (!copiedQuality.invisible) outcome = `${copiedQuality.name} ${value > 0 ? "increased" : "decreased"} by ${value}.`
      } else if (change.type==="set") { 
        copiedQuality.value = value;
        if (!copiedQuality.invisible) outcome = `${copiedQuality.name} is now ${value}.`;
      } else if (change.type==="range") { 
        const result = Math.floor(Math.random() * (change.max+1 - value) + value);
        copiedQuality.value = result;
        if (!copiedQuality.invisible) outcome = `${copiedQuality.name} is now ${result}.`;
      } else if (change.type==="percent") { 
        copiedQuality.value = Math.ceil(copiedQuality.value + (copiedQuality.value * (value/100)));
        if (!copiedQuality.invisible) outcome = `${copiedQuality.name} ${value > 0 ? "increased" : "decreased"} by ${value} percent.`;
      } 
      if (copiedQuality.value === 0) {
        if (!copiedQuality.invisible) outcome = `You have lost all ${copiedQuality.name}!`;
        dispatch(removeQuality(id));
      } 
    
      else {
        const quality = QualityData.processAltText(copiedQuality);
        dispatch(setQuality({id, quality}));
      }        
      outcomes.push(outcome);
    }// end of change loop  
    if(!results.hide) {
      const newReport = { ...results.report, outcomes }
      dispatch(setActiveReport(newReport));
    }

    if(!results.remain) {
      dispatch(clearActiveContext());
    }
  }

  function consumeSelectAction(actionId) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    
    let selectedAction;
    let selectedDiscovered;
    if (domain.activeContext) selectedAction = domain.activeContext.availableActions.filter(action => action.id === actionId)[0]
    else {
      const inStatic = domain.activeDomain.availableActions.filter(action => action.id === actionId);
      if (inStatic.length === 1) selectedAction = inStatic[0];
      else {
        selectedAction = domain.activeDomain.discoveredActions.filter(action => action.id === actionId)[0];
        dispatch(setActiveDynamicToId(selectedAction.id));
        selectedDiscovered = selectedAction.id;
      } 
    }
    const results = selectedAction.results;
    
    switch (results.type) {
      case "modify":  
        if (domain.activeDynamic) {
          const newDiscoveredActions = discoveredActions[domain.activeDomain.id].filter(a => a.id !== (domain.activeDynamic));
          dispatch(setDiscoveredActionsByDomainId({domainId: domain.activeDomain.id, actions: newDiscoveredActions}));
        }
        else if (selectedDiscovered) {
          const newDiscoveredActions = discoveredActions[domain.activeDomain.id].filter(a => a.id !== (selectedDiscovered));
          dispatch(setDiscoveredActionsByDomainId({domainId: domain.activeDomain.id, actions: newDiscoveredActions}));
        }
      
        applyActionResults(selectedAction.results);
        break;

      case "context":
        const selectedContext = ContextsAPI.getContextById(results.context);
        const { availableActions, lockedActions } = 
          ActionFunctions.selectStaticActions(selectedContext.staticActions, qualities);
  
        selectedContext.availableActions = availableActions;
        selectedContext.lockedActions = lockedActions;
        dispatch(setActiveContext(selectedContext));
        break;

      case "challenge":
        if (domain.activeDynamic) {
          const newDiscoveredActions = discoveredActions[domain.activeDomain.id].filter(a => (a.id !== (domain.activeDynamic || selectedAction.id)));
          dispatch(setDiscoveredActionsByDomainId({domainId: domain.activeDomain.id, actions: newDiscoveredActions}));
        }
        else if (selectedDiscovered) {
          const newDiscoveredActions = discoveredActions[domain.activeDomain.id].filter(a => a.id !== (selectedDiscovered));
          dispatch(setDiscoveredActionsByDomainId({domainId: domain.activeDomain.id, actions: newDiscoveredActions}));
        }

        const outcome = Math.floor(Math.random() * 101); 
        console.log(`Challenge: ${selectedAction.odds} vs ${outcome}`);
        if (selectedAction.odds > outcome ) applyActionResults(selectedAction.results.success);
        else applyActionResults(selectedAction.results.failure);
        
        break;
      default:
        console.log("Action type unknown.");
    }
    dispatch(hideTooltip());
  }

  if (domain.activeReport) {
    return (
      <DomainDiv>
        <HeaderDiv>
          <Title>{domain.activeReport.title}</Title>
          <Text>{domain.activeReport.text}</Text>
        </HeaderDiv>
        <OutcomesList />
        <ContinueButton />
      </DomainDiv>
    )
  }

  if (domain.activeContext) {
    return (
      <DomainDiv>
        <HeaderDiv>
          <Title>{domain.activeContext.title}</Title>
          <Text>{domain.activeContext.text}</Text>
        </HeaderDiv>
        <ActionList
          availableActions={domain.activeContext.availableActions} 
          unavailableActions={domain.activeContext.lockedActions}
          selectAction={consumeSelectAction}/>
        <BackButton />
      </DomainDiv>
    )
  }

  

  if (domain.activeDomain) {
    const calculatedSlots = Math.min((domain.activeDomain.possibleActions?.length || 0),(domain.activeDomain.slotsCount - (domain.activeDomain.discoveredActions?.length || 0)));
    return (
      <DomainDiv>
        <HeaderDiv>
          <Title>{domain.activeDomain.title}</Title>
          <Text>{domain.activeDomain.text}</Text>
        </HeaderDiv>
        <ActionList 
          availableActions={domain.activeDomain.availableActions} 
          unavailableActions={domain.activeDomain.lockedActions}
          discoveredActions={domain.activeDomain.discoveredActions}
          slots={calculatedSlots}
          selectSlot={consumeSelectSlot}
          selectAction={consumeSelectAction}
          possibleActionsCount={domain.activeDomain.possibleActions?.length || 0}
        />
      </DomainDiv>
    )
  }
  if (domain.activeDomain?.lockedActions) {
    return (<div>
      {domain.activeDomain.lockedActions.map(action =>
        <p key={action.id}>{action.tooltip}</p>
      )}
    </div>)
  }

  return null;
}

export default Stage;
