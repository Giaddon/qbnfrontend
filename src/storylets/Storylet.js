/** Displays a storylet's name and description. Click on it to make it the active story. */

import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { setContent } from '../content/contentSlice';
import StoriesAPI from '../utilities/StoriesAPI';
import { Subtitle, Text } from '../typography/typography';
import { showTooltip, hideTooltip } from '../tooltip/tooltipSlice';

const StoryletDiv = styled.div`
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 0.5em 0.5em;
  margin: 0.5em 0;
  cursor: pointer;
  p:nth-child(2) {
    margin-top: 0.3em;
  }
`

function Storylet({ 
  id="Unknown Id", 
  name="Unidentified Storylet", 
  text="Unknown text", 
  tooltip="Unknown tooltip."}) {
  const dispatch = useDispatch();

  function selectStorylet() {
    const selectedStory = StoriesAPI.getById(id);
    const newConent = {text: selectedStory.content.text, choices: selectedStory.choices};
    dispatch(setContent(newConent) || null);
  }
  
  return (
    <StoryletDiv 
      onClick={selectStorylet}
      onMouseMove={(e) => dispatch(showTooltip({text:tooltip, x: e.pageX, y: e.pageY}))}
      onMouseLeave={() => dispatch(hideTooltip())}
    >
      <Subtitle>{name}</Subtitle>
      <Text>{text}</Text>
    </StoryletDiv>
  );
}

export default Storylet; 