/** The primary app component.
 * Will no doubt make sense to move engine logic into a child component at some point.
 * Displays the Navbar, Game, and Sidebar components.
 */

import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import NavBar from './interface/NavBar';
import { selectQualities, setQualities } from './qualities/qualitySlice';
import { setAvailableStorylets, setUnavailableStorylets } from './storylets/storyletSlice';
import { requirementsMet } from './utilities/utilityFunctions';
import StoriesAPI from './utilities/StoriesAPI';
import QualitiesAPI from './utilities/QualitiesAPI';
import DomainsAPI from './utilities/DomainsAPI'; 
import Game from './game/Game';
import Sidebar from './interface/Sidebar';
import { setDomain, selectDomain } from './domain/domainSlice';
import Tooltip from './tooltip/Tooltip';
import { hideTooltip } from './tooltip/tooltipSlice';

const AppDiv = styled.div`
  display: flex;  
  flex-flow: row nowrap;
  align-items: stretch;
  width: 85%;
  max-width: 960px;
  margin: 0 auto;
  background-color: #fff;
  min-height: 100vh;
  padding: 30px 20px 60px 20px;
`
function App() {
  const dispatch = useDispatch();
  const qualities = useSelector(selectQualities);
  const domain = useSelector(selectDomain);
  const [loaded, setLoaded] = useState(false);

  //Get qualities from API (new game) or local storage (continued game)
  useEffect(() => {
    // const savedGame = localStorage.getItem('qbnengine');
    // if (savedGame) {
    //   const gameData = JSON.parse(savedGame);
    //   dispatch(setQualities(gameData));
    // } else {
      const startingQualites = QualitiesAPI.getStarting();
      const startingDomain = DomainsAPI.getStarting();
      dispatch(setQualities(startingQualites));
      dispatch(setDomain(startingDomain));
      setLoaded(true);
    //} 
  }, [dispatch]);

  // When page loads or qualities change, compare all storylets against our
  // qualities to see what we are eligible for. Also, save qualities to local storage.
  useEffect(() => {     
    if (loaded) {
      const allStorylets = StoriesAPI.getByDomain(domain.id);
      let availableStorylets = [];
      let unavailableStorylets = [];
      if (allStorylets) {
        for (let storylet of allStorylets) {
          if (storylet.reqs) {  
            let reqs = storylet.reqs;
            const {passed, unlockedTooltip, lockedTooltip} = (requirementsMet(reqs, qualities))
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
      }  
      dispatch(setAvailableStorylets(availableStorylets));
      dispatch(setUnavailableStorylets(unavailableStorylets));
      dispatch(hideTooltip());
      localStorage.setItem('qbnengine', JSON.stringify(qualities));
    }
  }, [dispatch, qualities, loaded, domain]);


  if(loaded) {
    return (
      <AppDiv>
        <Sidebar />
        <Game />
        <NavBar />
        <Tooltip />
      </AppDiv>
    );
  }

  return "Loading..."

  
}

export default App;
