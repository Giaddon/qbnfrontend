import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Title, Text } from '../typography/typography';
import {
  setActiveDomain, 
  selectDomain, 
  possibleActionDiscovered,
  setActiveContext, 
  setActiveReport,
  clearActiveContext,
} from './domainSlice';
import { setQuality, selectQualities, removeQuality } from '../player/playerSlice';
import { hideTooltip } from '../tooltip/tooltipSlice';
import DomainsAPI from '../utilities/DomainsAPI'; 
import ActionList from '../actions/ActionsList';
import BackButton from './BackButton';
import ContinueButton from './ContinueButton';
import OutcomesList from './OutcomesList';
import DomainData from '../dataclasses/DomainData';
import QualitiesAPI from '../utilities/QualitiesAPI';
import QualityData from '../dataclasses/QualityData';

const DomainDiv = styled.div`
  padding: 15px;
  width:100%;
  background-color: white;
`
const HeaderDiv = styled.div`
  padding: 15px;
  min-height: 100px;
  border: 1px solid #000;
  background-color: inherit;
  p:nth-child(2) {
    margin-top:10px;
  }
  white-space: pre-wrap;
`

function Domain() {
  const dispatch = useDispatch();
  const domain = useSelector(selectDomain);
  const qualities = useSelector(selectQualities);

  useEffect(function prepareDomainWhenQualitiesChange() {
    const currentDomainId = qualities.domain.value.toString();
    let selectedDomain;
    // if (domain.activeDomain?.id === currentDomainId){
    //   selectedDomain = {...domain.activeDomain}
    // } else {
    selectedDomain = DomainsAPI.getDomainById(currentDomainId);
    
    const { availableActions, lockedActions, possibleActions } = 
      DomainData.selectActions(selectedDomain.actions, qualities);

    selectedDomain.availableActions = availableActions;
    selectedDomain.lockedActions = lockedActions;
    selectedDomain.possibleActions = possibleActions;
    dispatch(setActiveDomain(selectedDomain));
  
  },[qualities, dispatch])

  function consumeSelectSlot() {
    const possibleActions = [...domain.activeDomain.possibleActions];
    const currentDiscoveredActions = 
      domain.activeDomain.discoveredActions ? [...domain.activeDomain.discoveredActions] : [];
    const index = Math.floor(Math.random() * possibleActions.length);
    const revealedAction = {...possibleActions[index]};

    const remainingPossibleActions = possibleActions.filter(action => action.id !== revealedAction.id);
    const newDiscoveredActions = [...currentDiscoveredActions, revealedAction]
    
    dispatch(possibleActionDiscovered({remainingPossibleActions, newDiscoveredActions}))
  }

  function consumeSelectAction(actionId, type="static") {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    
    let selectedAction;
    let outcomes = [];
    if (domain.activeContext) selectedAction = domain.activeContext.actions[type].filter(action => action.id === actionId)[0]
    else selectedAction = domain.activeDomain.actions[type].filter(action => action.id === actionId)[0]
    
    const results = selectedAction.results;
    
    switch (results.type) {
      case "modify":
        for (let change of results.changes) {
          const { id, value } = change;
          let copiedQuality = qualities[id] ? {...qualities[id]} : QualitiesAPI.getQualityById(id);
          let outcome = '';
          if(!copiedQuality.value) { 
            copiedQuality.value = 0;
            copiedQuality.value += value;
            if (!copiedQuality.invisible) outcome = `${copiedQuality.name} ${value > 0 ? "increased" : "decreased"} by ${value}.`
          } else {
            if (change.type==="adjust") {
              copiedQuality.value += value;
              if (!copiedQuality.invisible) outcome = `${copiedQuality.name} ${value > 0 ? "increased" : "decreased"} by ${value}.`
            } 
            else if (change.type==="set") { 
              copiedQuality.value = value;
              if (!copiedQuality.invisible) outcome = `${copiedQuality.name} is now ${value}.`;
            }
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
        }

        if(!results.hide) {
          const newReport = { ...results.report, outcomes }
          dispatch(setActiveReport(newReport));
        }

        if(!results.remain) {
          dispatch(clearActiveContext());
        }

        break;

      case "context":
        const selectedContext = {...domain.activeDomain.contexts[results.context]};
        const { availableActions, lockedActions } = 
          DomainData.selectActions(selectedContext.actions, qualities);
  
        selectedContext.availableActions = availableActions;
        selectedContext.lockedActions = lockedActions;
        dispatch(setActiveContext(selectedContext));

        break;

      default:
        console.log("What?");
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
          slots={Math.min(domain.activeDomain.slotsCount, domain.activeDomain.possibleActions?.length) - (domain.activeDomain.discoveredActions?.length || 0)}
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

export default Domain;
