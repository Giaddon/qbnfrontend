/** The "mind" of the game engine, where logic for proceeding from quality states resides. */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Domain from '../domain/Domain';
import DomainsAPI from '../utilities/DomainsAPI';
import ContextAPI from '../utilities/ContextsAPI';
import { selectQualities, selectDiscoveredActions, setDiscoveredActionsByDomainId } from '../player/playerSlice';
import { selectDomain, setActiveDomain, setActiveContext, } from '../domain/domainSlice';
import DirectorFunctions from '../dataclasses/DirectorFunctions';

function Director() {
  const dispatch = useDispatch();
  const qualities = useSelector(selectQualities);
  const discoveredActions = useSelector(selectDiscoveredActions);
  const domain = useSelector(selectDomain);
  const [qualitiesChanged, setQualitiesChanged] = useState(false);

  //This effect prevents the next affect when running just when domain state is changed.
  useEffect(() => {
    setQualitiesChanged(true);
  }, [qualities])
  
  //This effect runs when qualities change, and decides what to do about it.
  useEffect(function processQualityChange() {
    if(qualitiesChanged) {
      // If the player is changing domains.
      if(domain.activeDomain && (qualities.domain.value !== domain.activeDomain.id)) { 
        dispatch(setActiveDomain())
      }

      // If there's an active context
      if (domain.activeContext) {
        // Update actions there.
        const { availableActions, lockedActions } = 
        DirectorFunctions.selectStaticActions(domain.activeContext.staticActions, qualities);
      
        let newContext = ContextAPI.getContextById(domain.activeContext.id);
        newContext.availableActions = availableActions;
        newContext.lockedActions = lockedActions;
        
        dispatch(setActiveContext(newContext));
      }

      // Always update actions for domain
      let newDomain = DomainsAPI.getDomainById(qualities.domain.value);
      const { availableActions, lockedActions } = 
        DirectorFunctions.selectStaticActions(newDomain.staticActions, qualities);
      
      if (newDomain.dynamicActions && newDomain.dynamicActions.length > 0) {
        const { possibleActions } = 
        DirectorFunctions.selectDynamicActions(newDomain.dynamicActions, qualities);
        newDomain.possibleActions = possibleActions;
      }

      newDomain.availableActions = availableActions;
      newDomain.lockedActions = lockedActions;
      
      if (discoveredActions[newDomain.id]) {
        const { possibleActions } = DirectorFunctions.selectDynamicActions(discoveredActions[newDomain.id], qualities) 
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

  }, [qualities, domain.activeContext, domain.activeDomain, qualitiesChanged, dispatch]);

  return <Domain />
}

export default Director;