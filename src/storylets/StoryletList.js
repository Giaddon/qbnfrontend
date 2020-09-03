/** Holds individual storylets or a message indicating no storylets are available.
 */

import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Storylet from "./Storylet";
import { selectStorylets } from './storyletSlice';
import { Text } from '../typography/typography';

const StoryletListDiv = styled.div`
  flex: 0 1 auto;
  padding: 10px;
`

function StoryletList() {
  const storylets = useSelector(selectStorylets);
  function newGame() {
    localStorage.clear();
    window.location.reload();
  }
  
  if ( !storylets.available || storylets.available.length < 1) {
    return (
      <StoryletListDiv>
        <Text>No storylets available. I guess you won...?</Text>
        <button onClick={newGame}>Clear data.</button>
      </StoryletListDiv>
    );
  }
  
  return (
    <StoryletListDiv>
      {storylets.available.map(
          ({id, title, description, tooltip, results}) =>
            <Storylet 
              key={id} 
              id={id} 
              title={title} 
              text={description} 
              tooltip={tooltip}
              results={results} 
            />)
      }
      {storylets.unavailable && storylets.unavailable.length > 0
        ? <div>
          {storylets.unavailable.map(
          ({id, title, description, tooltip, results}) =>
            <Storylet 
              key={id} 
              id={id} 
              title={title} 
              text={description} 
              tooltip={tooltip}
              results={results}
              disabled
            />)
      }
        </div>
        : null
      }
      
    </StoryletListDiv>
  );
}

export default StoryletList;