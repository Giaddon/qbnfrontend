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

import { selectQualities } from './qualities/qualitySlice';
import { setStorylets, selectStorylets } from './storylets/storyletSlice';
import { clearContent, selectContent } from './content/contentSlice';
import StoriesAPI from './utilities/StoriesAPI';

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

  // When page loads or qualities change, compare all storylets against our
  // qualities to see what we are eligible for.
  useEffect(() => {
    const allStorylets = StoriesAPI.getAll();
    const avilableStorylets = Object.values(allStorylets).filter(
      ({reqs}) => Object.entries(reqs).every(
        ([key, value]) => qualities[key]?.value === value
      )
    ); 
    dispatch(setStorylets(avilableStorylets) || null);
    dispatch(clearContent());

  }, [dispatch, qualities]);

  return (
    <GameWindow>
      <QualityList qualities={qualities} />
      <StoryletList storylets={storylets} />
      <Content text={content?.text || ""} choices={content?.choices || []} />  
    </GameWindow>
  );
}

export default App;
