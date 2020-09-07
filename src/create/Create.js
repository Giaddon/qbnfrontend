import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import download from 'downloadjs';

import { 
  addQualityToCreate, 
  addDomainToCreate, 
  addActionToCreate, 
  selectCreate, 
  setAllCreate,
  addStoryletToCreate } from './createToolsSlice';
import { defaultQualities, defaultDomains, defaultActions, defaultStorylets } from './defaults/defaultData'; 
import ItemsList from './ItemList';
import Navbar from './Navbar';

const CreateDiv = styled.div`
  margin: 0 auto;
  text-align: center;
  color: white;
  font-family: "IBMPlexSerif", serif;
  font-size: 1.2em;
  padding: 0px 10px;
  max-width: 1920px;
`

const DownloadButton = styled.div`
  font-family: "Alata", sans-serif;
  font-size: 2.0em;
  margin: 5px auto;
  color: white;
  max-width: 300px;
  background-color: skyblue;
  padding: 5px 25px;
  border: 1px solid #000;
  border-radius:3px;
  cursor: pointer;
  transition: background .2s ease;
`

const CreateTitle = styled.p`
  font-family: 'Alata', sans-serif;
  font-size: 6em;
  letter-spacing: 0.1em;
`

const CreateInterfaceDiv = styled.div`
display: flex;
  flex-flow: row nowrap;
`

function Create() {
  const dispatch = useDispatch();
  const createData = useSelector(selectCreate);
  const [activeList, setActiveList] = useState({first: null, second: null});

  useEffect(function createCheckforDataOnInitialMount() {
    const {qualities, domains, actions, storylets } = {
      qualities: localStorage.getItem('createqualities'), 
      domains: localStorage.getItem('createdomains'),
      actions: localStorage.getItem('createactions'),
      storylets: localStorage.getItem('createstorylets'),
    }

    if(qualities && domains && actions && storylets) {
      const createState = {
        qualities: JSON.parse(qualities),
        domains: JSON.parse(domains),
        actions: JSON.parse(actions),
        storylets: JSON.parse(storylets),
      }
      dispatch(setAllCreate(createState));
    } else {
      if (qualities) { // Can we find data already in localstorage? 
        const parsedQualities = JSON.parse(qualities);
        Object.values(parsedQualities).forEach(quality => {
          dispatch(addQualityToCreate(quality));
        })
      } else { // If not, load the defaults.
        Object.values(defaultQualities).forEach(quality => {
          dispatch(addQualityToCreate(quality));
        })
      }
      if (domains) {
        const parsedDomains = JSON.parse(domains);
        Object.values(parsedDomains).forEach(domain => {
          dispatch(addDomainToCreate(domain));
        })
      } else {
        Object.values(defaultDomains).forEach(domain => {
          dispatch(addDomainToCreate(domain));
        })
      }
      if (actions) {
        const parsedActions = JSON.parse(actions);
        Object.values(parsedActions).forEach(action => {
          dispatch(addActionToCreate(action));
        })
      } else {
        Object.values(defaultActions).forEach(action => {
          dispatch(addActionToCreate(action));
        })
      }

      if (storylets) {
        const parsedStorylets = JSON.parse(storylets);
        Object.values(parsedStorylets).forEach(storylet => {
          dispatch(addStoryletToCreate(storylet));
        })
      } else {
        Object.values(defaultStorylets).forEach(storylet => {
          dispatch(addStoryletToCreate(storylet));
        })
      }
    }
  },[dispatch])
  
  useEffect( function storeDataInLocalStorage() {
    const stringQualities = JSON.stringify(createData.qualities);
    if (stringQualities) {
      localStorage.setItem('createqualities', stringQualities);

    } 
    
    const stringActions = JSON.stringify(createData.actions);
    if (stringActions) {
      localStorage.setItem('createactions', stringActions);
      }
    
    const stringDomains = JSON.stringify(createData.domains);
    if (stringDomains) {
      localStorage.setItem('createdomains', stringDomains);
      }

    const stringStorylets = JSON.stringify(createData.storylets);
    if (stringStorylets) {
      localStorage.setItem('createstorylets', stringStorylets);
    }
  }, [createData])

  function clickExport() {
    let domains = Object.values(createData.domains).map(domain => ({ ...domain }));
    let storylets = Object.values(createData.storylets).map(storylet => ({ ...storylet }))
    for (let i = 0; i < domains.length; i++) {
      domains[i].actions = [...domains[i].actions];
      for (let j= 0; j < domains[i].actions.length; j++) {  
        domains[i].actions[j] = createData.actions[domains[i].actions[j].id];
      }
    }

    for (let i = 0; i < storylets.length; i++) {
      storylets[i].actions = [...storylets[i].actions];
      for (let j= 0; j < storylets[i].actions.length; j++) {  
        storylets[i].actions[j] = createData.actions[storylets[i].actions[j].id];
      }
    }

    let objectifiedDomains = {};
    let objectifiedStorylets = {};

    domains.forEach(domain => {
      objectifiedDomains[domain.id] = domain;
    }); 

    storylets.forEach(storylet => {
      objectifiedStorylets[storylet.id] = storylet;
    }); 

    const stringQualities = localStorage.getItem('createqualities');
    const stringDomains = JSON.stringify(objectifiedDomains);
    const stringStorylets = JSON.stringify(objectifiedStorylets);
    
    const exportedWorld = "const domains = " + stringDomains + "; const qualities = " + stringQualities + "; const storylets = " + stringStorylets + "; export { domains, qualities, storylets }";
   
    download(exportedWorld, 'qbnworld.js', 'text/plain')
    
    
    

    
    
  }

  function setList(list){
    if (activeList.first===list) setActiveList({...activeList, first:null});
    else setActiveList({...activeList, first:list});
  }

  function setSecondList(list){
    if (activeList.second===list) setActiveList({...activeList, second:null});
    else setActiveList({...activeList, second:list});
  }

  return (
    <CreateDiv>
      <Navbar setList={setList} />
      <Navbar setList={setSecondList} reverse={true} />
      <CreateTitle>CREATE</CreateTitle>
      <DownloadButton onClick={clickExport}><p>Download World</p></DownloadButton>
      <CreateInterfaceDiv>
        {activeList.first==="qualities" 
          ? <ItemsList items={Object.values(createData.qualities)} title="Qualities" type="qualities" />  
          : null
        }
        {activeList.first==="domains" 
          ? <ItemsList items={Object.values(createData.domains)} title="Domains" type="domains" /> 
          : null 
        }
        {activeList.first==="actions" 
          ? <ItemsList items={Object.values(createData.actions)} title="Actions" type="actions" /> 
          : null 
        }
        {activeList.first==="storylets" && createData.storylets
          ? <ItemsList items={Object.values(createData.storylets)} title="Storylets" type="storylets" /> 
          : null 
        }
        {activeList.second==="qualities" 
          ? <ItemsList items={Object.values(createData.qualities)} title="Qualities" type="qualities" />  
          : null
        }
        {activeList.second==="domains" 
          ? <ItemsList items={Object.values(createData.domains)} title="Domains" type="domains" /> 
          : null 
        }
        {activeList.second==="actions" 
          ? <ItemsList items={Object.values(createData.actions)} title="Actions" type="actions" /> 
          : null 
        }
        {activeList.second==="storylets" && createData.storylets
          ? <ItemsList items={Object.values(createData.storylets)} title="Storylets" type="storylets" /> 
          : null 
        }
      </CreateInterfaceDiv>
    </CreateDiv>
  )
}

export default Create;