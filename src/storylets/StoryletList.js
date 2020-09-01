/** Holds individual storylets or a message indicating no storylets are available.
 */

import React from 'react';
import styled from 'styled-components';

import Storylet from './Storylet';

const StoryletListDiv = styled.div`
  display: flex;
  flex-flow: column no-wrap;
  align-items: flex-start;
  align-content: flex-start;
  flex: 0 1 auto;
  width: 320px;
  padding: 10px;
  border-right: 1px solid #000;
`

function StoryletList({ storylets }) {
  if ( !storylets || storylets.length < 1) {
    return (
      <StoryletListDiv>
        <p>No storylets available. I guess you won...?</p>
      </StoryletListDiv>
    ) ;
  }
  
  return (
    <StoryletListDiv>
      {Object.values(storylets).map(
          ({id, name, description}) => <Storylet key={id} id={id} name={name} text={description} />)
      }
    </StoryletListDiv>
  );
}

export default StoryletList;