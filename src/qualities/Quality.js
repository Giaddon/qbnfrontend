/** Displays a quality name and value. */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';
import { SidebarSubtitle, SidebarText } from '../style/typography';
import { togglePinQuality } from '../player/playerSlice';
import { selectDomain, setActiveContext } from '../domain/domainSlice';
import ContextsAPI from '../utilities/ContextsAPI';
import ActionFunctions from '../utilities/ActionFunctions';
import { selectQualities } from '../player/playerSlice';
import { setMainDisplay } from '../interface/interfaceSlice';
import { highlight } from '../style/colors';

const QualityDiv = styled.div`
  position: relative;
  flex: 0 1 200px;
  border: 1px solid black;
  border-radius: 2px;
  padding: 10px;
  margin: 3px;
  cursor: ${props => props.context ? 'pointer;' : 'default;'}
  transition: border .2s ease;
  
  :hover {
    ${props => props.context
      ? `border: 1px solid ${highlight};`
      : null
    }
  }

  p:nth-child(2) {
    margin-top: 0.1em;
  }
`
const PinButton = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  height: 10px;
  width: 10px;
  border: 1px;
  border: 1px solid black;
  cursor: pointer;
  background-color: ${props => props.pinned ? 'black' : 'inherit'}
`

function Quality({ 
  id="no id found",
  name="Unidentified Quality",
  description="", 
  value=1,
  change=null,
  pinned=false,
  context=null, 
  tooltip="" 
}) {
  const dispatch = useDispatch();
  const domain = useSelector(selectDomain);
  const qualities = useSelector(selectQualities);

  function clickPin(event) {
    event.stopPropagation()
    dispatch(togglePinQuality(id));
    dispatch(hideTooltip());
  }

  function clickQuality() {
    if (context) {
      if (!domain.activeDomain.locked && !domain.activeReport && !domain.activeContext?.locked) {
        const selectedContext = ContextsAPI.getContextById(context);
        const { availableActions, lockedActions } = 
          ActionFunctions.selectStaticActions(selectedContext.staticActions, qualities);
  
        selectedContext.availableActions = availableActions;
        selectedContext.lockedActions = lockedActions;
        dispatch(setActiveContext(selectedContext));
        dispatch(setMainDisplay('story'));
        dispatch(hideTooltip());
      }
    }
  }

  return (
    <QualityDiv context={context} onClick={clickQuality}
      onMouseMove={(e) => dispatch(showTooltip({text:`${name} | ${value}.${change || change===0 ? `\n${change} change points. ${value < 50 ? (value + 1) - change : 50 - change} needed for level ${(value + 1)}.` : ""}`, x: e.pageX, y: e.pageY}))}
      onMouseLeave={() => dispatch(hideTooltip())}
    >
      <SidebarSubtitle>{name} &bull; {value}</SidebarSubtitle>
      <SidebarText>{description}</SidebarText>
      <PinButton pinned={pinned} onClick={clickPin} />
    </QualityDiv>
  );
}

export default Quality; 