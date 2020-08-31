/** Displays list of qualities */

import React, { useState } from 'react';
import styled from 'styled-components';

import Quality from './Quality.js';

const QualityListDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  align-content: flex-start;
  flex: 0 1 auto;
  width: 320px;  
  border-right: 1px solid #000;
  min-height: 100vh;
  padding: 10px;
  div:not(:first-child) {
    margin-left: 10px; 
  }
`

function QualityList({ qualities }) {  
  return (
    <QualityListDiv>
      {Object.values(qualities).map(
          ({name, value}) => <Quality key={name} name={name} value={value} />)
      }
    </QualityListDiv>
  );
}

export default QualityList;