/** Displays list of qualities */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import QualityBlock from './QualityBlock';
import { SidebarText, SidebarTitle } from '../typography/typography';
import { selectQualities } from '../player/playerSlice';

const QualityListDiv = styled.div`
  
`

function QualityList() {  
  const [categories, setCategories] = useState([]);  
  const qualities = useSelector(selectQualities);

  useEffect(() => {
    function makeReactBlocks(qualitiesArray) {
      let categories = {};
      for (let quality of qualitiesArray) {
        if(!quality.invisible) {
          let category = quality.category || '';   
          if (categories[category]) {
            categories[category].push(quality);
          } else {
            categories[category] = [quality];
          }
        }
      }
      let reactBlocks = [];
      for (let [key, value] of Object.entries(categories)) {
        reactBlocks.push(<QualityBlock key={key} name={key} qualities={value} />)
      }

      return reactBlocks;
    }
      
    if (qualities) {
      let displayBlocks = makeReactBlocks(Object.values(qualities));
      setCategories(displayBlocks);
    }
  }, [qualities])
  
  return (
    <QualityListDiv>
      <SidebarTitle>Qualities</SidebarTitle>
      {categories.length > 0
        ? categories
        : <SidebarText>You are a person without qualities.</SidebarText>
      }
    </QualityListDiv>
  );
}

export default QualityList;