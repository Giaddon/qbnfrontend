import React from 'react';
import styled from 'styled-components';

import Quality from './Quality';

const QualityBlockDiv = styled.div`
  flex: 1 0 100%;
  & ~ & {
    margin-top: 2em;
  }
`
const QualityBlockTitle = styled.p`
  font-size: 1.6em;
  font-weight: 400;
`

function QualityBlock({ name, qualities }) {
  return (
    <QualityBlockDiv>
      <QualityBlockTitle>{name}</QualityBlockTitle>
      {Object.values(qualities).map(
        ({id, name, value, description, tooltip}) => 
        <Quality 
          key={id} 
          id={id} 
          description={description}
          tooltip={tooltip}
          name={name} 
          value={value} 
        />)
      }
    </QualityBlockDiv>
  );
}

export default QualityBlock;