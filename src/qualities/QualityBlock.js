import React from 'react';
import styled from 'styled-components';

import Quality from './Quality';
import { SidebarTitle } from '../style/typography';

const QualityBlockDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const QualityContainer = styled.div`
  background-color: white;
  padding: 5px;
  & ~ & {
    margin-top: 2px;
    border-top: 1px solid #333;
  }
`

function QualityBlock({ name, qualities }) {
  // const [ myQualities, setMyQualities ] = useState([]);

  // useEffect(()=>{
  //   function makeReactQualities(qualities) {
  //     let displayedQualities = [];
  //     for (let base of qualities) {
  //       const quality = {...base};
  //       if (quality.invisible) {
  //         // do nothing, quality marked as invisible.
  //       } else {
  //         if (quality.descriptions) { // prepare one of several descriptions for display, based on value.
  //           let descMap = new Map();
  //           for (let [key, value] of quality.descriptions) {
  //             descMap.set(key, value);
  //           }
  //           quality.description = getLowestValueFromMap(descMap, quality.value);
  //         } // finished with descriptions prep
  //         if (quality.alt) { // prepare string display for value
  //           let altMap = new Map(quality.alt);
  //           quality.value = getLowestValueFromMap(altMap, quality.value);
  //         } // finished with alt prep
          
  //         displayedQualities.push(
  //           <Quality 
  //             key={quality.id} 
  //             id={quality.id} 
  //             name={quality.name}
  //             description={quality.displayDescription}
  //             tooltip={quality.tooltip}
  //             value={quality.value}
  //             change={quality.change}
  //           />)
  //       }
  //     }
  //     return displayedQualities;
  //   }

  //   if (qualities) {
  //     let displayedQualities = makeReactQualities(qualities);
  //     setMyQualities(displayedQualities);
  //   }

  // }, [qualities])
  
 
  if (qualities) { 
    return (
      <QualityContainer>
        <SidebarTitle>{name}</SidebarTitle>
        <QualityBlockDiv>
          {qualities.map(quality =>
            <Quality 
              key={quality.id} 
              id={quality.id} 
              name={quality.name}
              description={quality.displayDescription}
              tooltip={quality.tooltip}
              value={quality.displayValue}
              change={quality.change}
              pinned={quality.pinned}
              context={quality.context}
            />)
          }
        </QualityBlockDiv>
      </QualityContainer>
    );
  }
  return null;
}

export default QualityBlock;