/** Displays list of qualities */

import React from 'react';
import styled from 'styled-components';

import Quality from './Quality.js';

const QualityListDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: flex-start;
  flex: 0 1 auto;
  width: 320px;  
  border-right: 1px solid #000;
  padding: 10px;
  div:not(:first-child) {
    margin-top:6px;
  }
`

function QualityList({ qualities }) {  
  return (
    <QualityListDiv>
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
    </QualityListDiv>
  );
}

export default QualityList;