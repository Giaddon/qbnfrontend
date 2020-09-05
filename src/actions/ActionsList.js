/** Holds individual actions or a message indicating no actions are available.
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import Action from "./Action";
import { requirementsMet, challengeRequirementsMet } from '../utilities/utilityFunctions';
import { selectQualities } from '../qualities/qualitySlice';
import { selectDomain } from '../domain/domainSlice';
import { Text } from '../typography/typography';
import QualitiesAPI from '../utilities/QualitiesAPI';

const ActionListDiv = styled.div`
  flex: 0 1 auto;
  padding: 10px;
`

function ActionList() {
  const dispatch = useDispatch();
  const domain = useSelector(selectDomain);
  const qualities = useSelector(selectQualities);
  const [availableActions, setAvailableActions] = useState([]);
  const [unavailableActions, setUnavailableActions] = useState([]);

  useEffect(() => {
    setAvailableActions(a => []);
    setUnavailableActions(a => []);
    const actions = domain.activeStorylet ? domain.activeStorylet.actions : domain.activeDomain.actions;
    if (actions) {
      for (let action of actions) {
        if (action.reqs) {
          let reqs = action.reqs;
          let qualityNames = {};
          reqs.forEach(({ id }) => {
            const { name } = QualitiesAPI.getById(id);
            qualityNames[id] = name;
          });
          if (action.type === "modify" || action.type === "storylet") {
            const {passed, tooltip} = requirementsMet(reqs, qualities, qualityNames);
            const newAction = {...action, tooltip}
            passed 
              ? setAvailableActions(a => [...a, newAction]) 
              : setUnavailableActions(a => [...a, newAction]);
          } else if (action.type==="challenge") {
            const { passed, oddsDescription, tooltip, odds } = challengeRequirementsMet(reqs, qualities, qualityNames);
            const newDescription = action.description + oddsDescription
            const newAction = {...action, description: newDescription, tooltip, odds}
            passed 
              ? setAvailableActions(a => [...a, newAction]) 
              : setUnavailableActions(a => [...a, newAction]);
          }
        } else { //if storylet has no reqs
            const newAction = {...action, tooltip: "Always available."}
            setAvailableActions(a => [...a, newAction]);
        }
      } // end action loop
    }
  }, [dispatch, domain, qualities]);
  
  function newGame() {
    localStorage.clear();
    window.location.reload();
  }
  
  if ( !availableActions || availableActions.length < 1) {
    return (
      <ActionListDiv>
        <Text>No actions available. I guess you won...?</Text>
        <button onClick={newGame}>Clear data.</button>
      </ActionListDiv>
    );
  }
  
  return (
    <ActionListDiv>
      {availableActions.map(
        ({id, type, title, description, tooltip, results, odds}) =>
          <Action 
            key={id} 
            type={type}
            id={id} 
            title={title} 
            text={description} 
            tooltip={tooltip}
            results={results} 
            domainId={domain.activeDomain.id}
            odds={odds}
          />)
      }
      {unavailableActions && unavailableActions.length > 0
        ? <div>
          {unavailableActions.map(
          ({id, type, title, description, tooltip, results}) =>
            <Action 
              key={id} 
              id={id}
              type={type} 
              title={title} 
              text={description} 
              tooltip={tooltip}
              disabled
            />)
          }
          </div>
        : null
      }
    </ActionListDiv>
  );
}

export default ActionList;