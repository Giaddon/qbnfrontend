/** The primary app component.
 * Will no doubt make sense to move engine logic into a child component at some point.
 * Displays qualities, available storylets, and content 
 * of the current story in columns from left to right.
 */

import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import QualityList from './qualities/QualityList';
import StoryletList from './storylets/StoryletList';
import Content from './content/Content';

import { selectQualities, addQuality } from './qualities/qualitySlice';
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
  max-width: 960px;
  margin: 0 auto;
  background-color: #fff;
  min-height: 100vh;
`
function App() {
  const dispatch = useDispatch();
  const storylets = useSelector(selectStorylets);
  const qualities = useSelector(selectQualities);
  const content = useSelector(selectContent);

  //Get qualities from API (new game) or local storage (continued game)
  useEffect(() => {
    const savedGame = localStorage.getItem('qbnengine');
    if (savedGame) {
      const loadedGame = JSON.parse(savedGame);
      Object.values(loadedGame).forEach(quality => {
        dispatch(addQuality(quality));
      });
    } else {
      const startingQualites = QualitiesAPI.getStarting();
      startingQualites.forEach(quality => {
        dispatch(addQuality(quality));
      });
    } 
  }, [dispatch]);

  // When page loads or qualities change, compare all storylets against our
  // qualities to see what we are eligible for. Also, save qualities to local storage.
  useEffect(() => {
    const allStorylets = StoriesAPI.getAll();
    const availableStorylets = [];
    const unavailableStorylets = [];

    for (let storylet of Object.values(allStorylets)) {
      let reqs = Object.entries(storylet.reqs);
      if (reqs.every(([quality, value]) => qualities[quality]?.value === value)){
        let unlockedTooltip = "Unlocked with\n";
        for (let [quality, value] of reqs) {
          unlockedTooltip += `${quality} of  '${value}'\n`
        }
        let tooltipedStorylet = {...storylet, tooltip: unlockedTooltip};
        availableStorylets.push(tooltipedStorylet);
      } else {
        let lockedTooltip = "Requires\n";
        for (let [quality, value] of reqs) {
          lockedTooltip += `${quality} of  '${value}'\n`
        }
        let tooltipedStorylet = {...storylet, tooltip: lockedTooltip};
        unavailableStorylets.push(tooltipedStorylet);
      }
    }
    dispatch(setAvailableStorylets(availableStorylets));
    dispatch(setUnavailableStorylets(unavailableStorylets));
    dispatch(clearContent());
    localStorage.setItem('qbnengine', JSON.stringify(qualities));

  }, [dispatch, qualities]);

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
