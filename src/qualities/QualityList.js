/** Displays list of qualities */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import QualityBlock from './QualityBlock';
import { SidebarSubtitle, SidebarTitle } from '../style/typography';
import { selectQualities } from '../player/playerSlice';

const QualityListDiv = styled.div`
  background-color: white;
  border-radius: 2px;
  padding: 5px;
`

function QualityList({ sidebar=false }) {  
  const [categories, setCategories] = useState([]);  
  const qualities = useSelector(selectQualities);

  useEffect(() => {
    function makeReactBlocks(qualitiesArray) {
      let categories = {};
      for (let quality of qualitiesArray) {
        if(!quality.invisible) {
          if (sidebar) {
            if (quality.pinned) {
              let category = quality.category || '';   
              if (categories[category]) {
                categories[category].push(quality);
              } else {
                categories[category] = [quality];
              }
            }
          } else { // not in sidebar
            let category = quality.category || '';   
            if (categories[category]) {
              categories[category].push(quality);
            } else {
              categories[category] = [quality];
            }
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
  }, [qualities, sidebar])
  
  const absentText = sidebar ? "No pinned qualities." : "You are a person without qualities."

  return (
    <QualityListDiv>
      <SidebarTitle>Qualities</SidebarTitle>
      {categories.length > 0
        ? categories
        : <SidebarSubtitle>{absentText}</SidebarSubtitle>
      }
    </QualityListDiv>
  );
}

export default QualityList;