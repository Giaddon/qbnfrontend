import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Quality from './Quality';
import { SidebarTitle } from '../typography/typography';
import { getLowestValueFromMap } from '../utilities/utilityFunctions';

const QualityBlockDiv = styled.div`
  & ~ & {
    margin-top: 2em;
  }
`

function QualityBlock({ name, qualities }) {
  const [ myQualities, setMyQualities ] = useState([]);

  useEffect(()=>{
    function makeReactQualities(qualities) {
      let displayedQualities = [];
      for (let base of qualities) {
        const quality = {...base};
        if (quality.invisible) {
          // do nothing, quality marked as invisible.
        } else {
          if (quality.descriptions) { // prepare one of several descriptions for display, based on value.
            let descMap = new Map();
            for (let [key, value] of quality.descriptions) {
              descMap.set(key, value);
            }
            quality.description = getLowestValueFromMap(descMap, quality.value);
          } // finished with descriptions prep
          if (quality.alt) { // prepare string display for value
            let altMap = new Map(quality.alt);
            quality.value = getLowestValueFromMap(altMap, quality.value);
          } // finished with alt prep
          
          displayedQualities.push(
            <Quality 
              key={quality.id} 
              id={quality.id} 
              name={quality.name}
              description={quality.description}
              tooltip={quality.tooltip}
              value={quality.value}
            />)
        }
      }
      return displayedQualities;
    }

    if (qualities) {
      let displayedQualities = makeReactQualities(qualities);
      setMyQualities(displayedQualities);
    }

  }, [qualities])
  
  
  
  return (
    <QualityBlockDiv>
      <SidebarTitle>{name}</SidebarTitle>
      {myQualities}
    </QualityBlockDiv>
  );
}

export default QualityBlock;