import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Title, Text } from '../style/typography';
import {
  selectDomain, 
  setActiveContext, 
  setActiveReport,
  clearActiveContext,
  setActiveDynamicToId,
  setCamera
} from '../redux/domainSlice';
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
import ContextsAPI from '../utilities/ContextsAPI';
import background from '../assets/backgrounds/groovepaper.png';
import ActionFunctions from '../utilities/ActionFunctions';

const DomainDiv = styled.div`
  flex: 0 1 800px;
  max-width: 800px;
  min-height: 400px;
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

  function consumeSelectAction(actionId) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    
    let selectedAction;
    let selectedDiscovered;

    // We get the action ID, we want to find the full data in state. 
    // Since actions live in domains, contexts, and events, we see which is active and search the availableAction array to find the action.
    // Events -> contexts -> domains (order of precedence)
    
    
    if (domain.camera === "event") {
      selectedAction = domain.activeEvent.availableActions.filter(a => a.id === actionId)[0];
    } else if (domain.camera === "context") {
      selectedAction = domain.activeContext.availableActions.filter(action => action.id === actionId)[0]
    } else { 
      // If the action is in a domain, we want to see if it is static or dynamic. 
      // if dynamic, we want to grab the ID so we can clear the action later.
      const inStatic = domain.activeDomain.availableActions.filter(action => action.id === actionId);
      if (inStatic.length === 1) selectedAction = inStatic[0];
      else {
        selectedAction = domain.activeDomain.discoveredActions.filter(action => action.id === actionId)[0];
        dispatch(setActiveDynamicToId(selectedAction.id));
        selectedDiscovered = selectedAction.id;
      } 
    }

    // All actions have results, so we grab them and process them based on type.
    const results = selectedAction.results;
    const discoveredId = selectedDiscovered || domain.activeDynamic;
    let resultsToProcess;
    let reportToProcess;
    switch (results.type) {
      // For context, we find the context, process the actions, then set it as the new active context.
      case "context":
        const selectedContext = ContextsAPI.getContextById(results.context);
        const { availableActions, lockedActions } = 
          ActionFunctions.selectStaticActions(selectedContext.staticActions, qualities);
        
        selectedContext.availableActions = availableActions;
        selectedContext.lockedActions = lockedActions;
        dispatch(setActiveContext(selectedContext));
        dispatch(setCamera("context"));
        break;
      
      // For modify, we see if the there is a stored dynamic action so we can clear it,
      // then apply each result.
      case "modify":  
        if (discoveredId) {
          const newDiscoveredActions = discoveredActions[domain.activeDomain.id].filter(a => a.id !== (discoveredId));
          dispatch(setDiscoveredActionsByDomainId({domainId: domain.activeDomain.id, actions: newDiscoveredActions}));
        }
        resultsToProcess = results;
        reportToProcess = results.report;
        break;

      case "challenge":
        if (discoveredId) {
          const newDiscoveredActions = discoveredActions[domain.activeDomain.id].filter(a => (a.id !== discoveredId));
          dispatch(setDiscoveredActionsByDomainId({domainId: domain.activeDomain.id, actions: newDiscoveredActions}));
        }

        const outcome = Math.floor(Math.random() * 101); 
        console.log(`Challenge: ${selectedAction.odds} vs ${outcome}`);
        if (selectedAction.odds > outcome ) {
          resultsToProcess = results.success;
          reportToProcess = results.success.report;
        } else {
          resultsToProcess = results.failure;
          reportToProcess = results.failure.report;
        }   
        break;

      default:
        console.log("Action type unknown.");
    }

    if (resultsToProcess) {
      const { outcomes, modifiedQualities } = ActionFunctions.processActionResults(resultsToProcess, qualities);

      for (let quality of modifiedQualities) {
        if (quality.value === 0) dispatch(removeQuality(quality.id)); 
        else dispatch(setQuality({id: quality.id, quality}));
      }
    
      if(!results.hide) {
        const newReport = {...reportToProcess, outcomes }
        dispatch(setActiveReport(newReport));
        dispatch(setCamera("report"));
      }

      if(!results.remain) {
        dispatch(clearActiveContext());
      }
    }

   
    dispatch(hideTooltip());
  }

  if (domain.camera === "report") {
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

  if (domain.camera === "event") {
    return (
      <DomainDiv>
        <HeaderDiv>
          <Title>{domain.activeEvent.title}</Title>
          <Text>{domain.activeEvent.text}</Text>
        </HeaderDiv>
        <ActionList
          availableActions={domain.activeEvent.availableActions} 
          unavailableActions={domain.activeEvent.lockedActions}
          selectAction={consumeSelectAction}
        />
      </DomainDiv>
    )
  }

  if (domain.camera === "context") {
    return (
      <DomainDiv>
        <HeaderDiv>
          <Title>{domain.activeContext.title}</Title>
          <Text>{domain.activeContext.text}</Text>
        </HeaderDiv>
        <ActionList
          availableActions={domain.activeContext.availableActions} 
          unavailableActions={domain.activeContext.lockedActions}
          selectAction={consumeSelectAction}
        />
        {domain.activeContext.locked 
          ? null
          : <BackButton />
        }
      </DomainDiv>
    )
  }

  if (domain.activeDomain && domain.camera === "domain") {
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
