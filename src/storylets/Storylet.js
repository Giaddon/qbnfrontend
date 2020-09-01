/** Displays a storylet's name and description. Click on it to make it the active story. */

import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { setContent } from '../content/contentSlice';
import StoriesAPI from '../utilities/StoriesAPI';

const StoryletDiv = styled.div`
  flex: 1 1 auto;
  border-radius: 4px;
  border: 1px solid #000;
  padding: 5px;
  cursor: pointer;
  h3 {
    font-size: 1.3em;
    font-weight: 400;
  }
  p {
    font-size: 1em;
    font-weight: 300;
    margin-top: 0.3em;
  }
`

function Storylet({ id="Unknown Id", name="Unidentified Storylet", text="Unknown text" }) {
  const dispatch = useDispatch();

  function selectStorylet() {
    const selectedStory = StoriesAPI.getById(id);
    const newConent = {text: selectedStory.content.text, choices: selectedStory.choices};
    dispatch(setContent(newConent) || null);
  }
  
  return (
    <StoryletDiv onClick={selectStorylet}>
      <h3>{name}</h3>
      <p>{text}</p>
    </StoryletDiv>
  );
}

export default Storylet; 