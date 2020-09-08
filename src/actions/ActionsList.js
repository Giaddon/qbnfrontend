/** Holds individual actions or a message indicating no actions are available.
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Action from "./Action";
import { requirementsMet, challengeRequirementsMet } from '../utilities/utilityFunctions';
import { selectQualities } from '../qualities/qualitySlice';
import { selectDomain } from '../domain/domainSlice';
import { SidebarTitle, Text } from '../typography/typography';
import QualitiesAPI from '../utilities/QualitiesAPI';
import ActionSlot from './ActionSlot';

const ActionListDiv = styled.div`
  flex: 0 1 auto;
  padding: 10px;
`

function ActionList({
  availableActions = [], 
  unavailableActions = [], 
  discoveredActions = [],
  slots = 0,
  selectSlot,
  selectAction,
  possibleActionsCount=0,
}) {
  const dispatch = useDispatch();

  function newGame() {
    localStorage.clear();
    window.location.reload();
  }
  
  let displayedSlots = [];
  for (let i = 0; i < slots; i++) {
    displayedSlots.push(<ActionSlot key={uuidv4()} selectSlot={selectSlot} />)
  }

  // if ( availableActions.length < 1) {
  //   return (
  //     <ActionListDiv>
  //       <Text>No actions available. I guess you won...?</Text>
  //       <button onClick={newGame}>Clear data.</button>
  //     </ActionListDiv>
  //   );
  // }
  
  return (
    <ActionListDiv>
      {availableActions.map(
        ({id, type, title, text, tooltip, results, odds}) =>
          <Action 
            key={id} 
            type={type}
            id={id} 
            title={title} 
            text={text} 
            tooltip={tooltip}
            results={results}
            selectAction={selectAction} 
            odds={odds}
          />)
      }
      {discoveredActions.map(
        ({id, type, title, text, tooltip, results, odds}) =>
          <Action 
            key={id} 
            type={type}
            id={id} 
            title={title} 
            text={text} 
            tooltip={tooltip}
            results={results} 
            odds={odds}
            selectAction={selectAction}
            discovered
          />)
      }
      {displayedSlots}
      {possibleActionsCount > 0
        ? <SidebarTitle>{possibleActionsCount} actions available to discover.</SidebarTitle>
        : null
      }
      {unavailableActions && unavailableActions.length > 0
        ? <div>
          {unavailableActions.map(
          ({id, type, title, text, tooltip, results}) =>
            <Action 
              key={id} 
              id={id}
              type={type} 
              title={title} 
              text={text} 
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