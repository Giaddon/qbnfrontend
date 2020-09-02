import React from 'react';
import styled from 'styled-components';

import Storylet from "./Storylet";
import { Title } from '../typography/typography';

const StoryletBlockDiv = styled.div`
& ~ & {
  margin-top: 3em;
}
`;

function StoryletBlock({ title, storylets }) {
  return (
    <StoryletBlockDiv>
      <Title>{title}</Title>
      {storylets.map(
          ({id, name, description, tooltip}) =>
            <Storylet 
              key={id} 
              id={id} 
              name={name} 
              text={description} 
              tooltip={tooltip} 
            />)
      }
    </StoryletBlockDiv>
  )
}

export default StoryletBlock;