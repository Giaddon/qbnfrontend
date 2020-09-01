/** Displays list of qualities */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import QualityBlock from './QualityBlock';

const QualityListDiv = styled.div`
  flex: 0 1 auto;
  width: 280px;  
  border-right: 1px solid #000;
  padding: 10px;
`

function QualityList({ qualities }) {  
  const [blocks, setBlocks] = useState([]);  
  
  useEffect(() => {
    if (qualities) {
      let displayBlocks = makeReactBlocks(Object.values(qualities));
      setBlocks(displayBlocks);
    }
  }, [qualities])


  function makeReactBlocks(qualitiesArray) {
    let blocks = {};
    for (let quality of qualitiesArray) {
      let block = quality.block;  
      if (blocks[block]) {
        blocks[block].push(quality);
      } else {
        blocks[block] = [quality];
      }
    }

    let reactBlocks = [];
    for (let [key, value] of Object.entries(blocks)) {
      reactBlocks.push(<QualityBlock key={key} name={key} qualities={value} />)
    }

    return reactBlocks;
  }

  return (
    <QualityListDiv>
      {blocks.length > 0
        ? blocks
        : <p>You are a person without qualities.</p>
      }
    </QualityListDiv>
  );
}

export default QualityList;