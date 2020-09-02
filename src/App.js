/** The primary app component.
 * Will no doubt make sense to move engine logic into a child component at some point.
 * Displays qualities, available storylets, and content 
 * of the current story in columns from left to right.
 */

import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import QualityList from './qualities/QualityList';
import StoryletList from './storylets/StoryletList';
import Content from './content/Content';

import { selectQualities, setQualities } from './qualities/qualitySlice';
import { 
  setAvailableStorylets, 
  setUnavailableStorylets, 
  selectStorylets } from './storylets/storyletSlice';
import { clearContent, selectContent } from './content/contentSlice';
import StoriesAPI from './utilities/StoriesAPI';
import QualitiesAPI from './utilities/QualitiesAPI';
import Tooltip from './tooltip/Tooltip';

const GameWindow = styled.div`
  display: flex;
  flex-flow: row no-wrap;
  justify-conent: space-around;
  align-items: stretch;
  align-content: space-around;
  max-width: 1100px;
  margin: 0 auto;
  background-color: #fff;
  min-height: 100vh;
`
function App() {
  const dispatch = useDispatch();
  const storylets = useSelector(selectStorylets);
  const qualities = useSelector(selectQualities);
  const content = useSelector(selectContent);

  const [qualitiesLoaded, setQualitiesLoaded] = useState(false);

  //Get qualities from API (new game) or local storage (continued game)
  useEffect(() => {
    // const savedGame = localStorage.getItem('qbnengine');
    // if (savedGame) {
    //   const gameData = JSON.parse(savedGame);
    //   dispatch(setQualities(gameData));
    // } else {
      const startingQualites = QualitiesAPI.getStarting();
      dispatch(setQualities(startingQualites));
      setQualitiesLoaded(true);
    //} 
  }, [dispatch]);

  // When page loads or qualities change, compare all storylets against our
  // qualities to see what we are eligible for. Also, save qualities to local storage.
  useEffect(() => {
    
    function requiermentsMet(reqs, qualities) {
      let passed = true;
      let lockedTooltip = "Requires\n";
      let unlockedTooltip = "Unlocked with\n";
      for (let req of reqs) {
        if (qualities[req.id]) {  
          let qualityValue = qualities[req.id]?.value
            if (req.comparison) { // If the requierment uses value comparison.
              switch (req.comparison.type) {
                case "equal":
                  if (req.comparison.value === qualityValue) {
                    unlockedTooltip += `${qualities[req.id].name} equal to ${req.comparison.value}\n`
                    break;
                  } else {
                    passed = false;
                    lockedTooltip += `${qualities[req.id].name} equal to ${req.comparison.value}\n`
                    break;
                  }
                case "not":
                  if (req.comparison.value !== qualityValue) {
                    unlockedTooltip += `${qualities[req.id].name} not ${req.comparison.value}\n`
                    break;
                  } else {
                    lockedTooltip += `${qualities[req.id].name} not ${req.comparison.value}\n`
                    passed = false;
                    break;
                  }
                case "smaller":
                  if (req.comparison.value >= qualityValue) {
                    unlockedTooltip += `${qualities[req.id].name} no more than ${req.comparison.value}\n`
                    break;
                  } else {
                    lockedTooltip += `${qualities[req.id].name} no more than ${req.comparison.value}\n`
                    passed = false;
                    break;
                  }
                case "bigger":
                  if (req.comparison.value <= qualityValue) {
                    unlockedTooltip += `${qualities[req.id].name} no less than ${req.comparison.value}\n`
                    break;
                  } else {
                    lockedTooltip += `${qualities[req.id].name} no less than ${req.comparison.value}\n`
                    passed = false;
                    break;
                  }
                default:
                  passed = false;
              }
            } else if (req.range) { // end comparison check, start range check 
              if (req.range.min <= qualityValue && qualityValue <= req.range.max ) {
                unlockedTooltip += `${qualities[req.id].name} between ${req.range.min} and ${req.range.max}.\n`
              } else {
                lockedTooltip += `${qualities[req.id].name} between ${req.range.min} and ${req.range.max}.\n`
                passed = false;
              }
            } // end range check; 
          } else { // if player doesn't have quality.
            passed = false;
            lockedTooltip += `Missing quality.\n`;
          }
       } // end loop
      
      return {passed, unlockedTooltip, lockedTooltip};
    }
          // for (let [quality, value] of reqs) {
          //   lockedTooltip += `${quality} of  '${value}'\n`
          // }
          // let tooltipedStorylet = {...storylet, tooltip: lockedTooltip};



    if (qualitiesLoaded) {
      const allStorylets = StoriesAPI.getAll();
      const availableStorylets = [];
      const unavailableStorylets = [];

      for (let storylet of Object.values(allStorylets)) {
        if (storylet.reqs) {  
          let reqs = storylet.reqs;
          const {passed, unlockedTooltip, lockedTooltip} = (requiermentsMet(reqs, qualities))
          if (passed) {
            let tooltippedStorylet = {...storylet, tooltip: unlockedTooltip};
            availableStorylets.push(tooltippedStorylet);
          } else {
            let tooltippedStorylet = {...storylet, tooltip: lockedTooltip};
            unavailableStorylets.push(tooltippedStorylet);
          } 
        } else { //if storylet has no reqs
          let tooltippedStorylet = {...storylet, tooltip: "Always available."};
          availableStorylets.push(tooltippedStorylet);
        }
      }

      dispatch(setAvailableStorylets(availableStorylets));
      dispatch(setUnavailableStorylets(unavailableStorylets));
      dispatch(clearContent());
      localStorage.setItem('qbnengine', JSON.stringify(qualities));
    }
  }, [dispatch, qualities, qualitiesLoaded]);

  return (
    <GameWindow>
      <QualityList qualities={qualities} />
      <StoryletList storylets={storylets} />
      <Content text={content?.text || ""} choices={content?.choices || []} />
      <Tooltip />
    </GameWindow>
  );
}

export default App;
