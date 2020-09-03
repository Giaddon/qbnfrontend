/** Displays list of qualities */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import QualityBlock from './QualityBlock';
import { SidebarText } from '../typography/typography';
import { selectQualities } from './qualitySlice';

const QualityListDiv = styled.div`

`

function QualityList() {  
  const [blocks, setBlocks] = useState([]);  
  const qualities = useSelector(selectQualities);


  useEffect(() => {
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
      
    if (qualities) {
      let displayBlocks = makeReactBlocks(Object.values(qualities));
      setBlocks(displayBlocks);
    }
  }, [qualities])
  
  return (
    <QualityListDiv>
      {blocks.length > 0
        ? blocks
        : <SidebarText>You are a person without qualities.</SidebarText>
      }
    </QualityListDiv>
  );
}

export default QualityList;