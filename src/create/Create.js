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
  addContextToCreate } from './createToolsSlice';
import { defaultQualities, defaultDomains, defaultActions, defaultContexts } from './defaults/defaultData'; 
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
  font-size: 1.4em;
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
  font-size: 4em;
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
    const {qualities, domains, actions, contexts } = {
      qualities: localStorage.getItem('createqualities'), 
      domains: localStorage.getItem('createdomains'),
      actions: localStorage.getItem('createactions'),
      contexts: localStorage.getItem('createcontexts'),
    }

    if(qualities && domains && actions && contexts) {
      const createState = {
        qualities: JSON.parse(qualities),
        domains: JSON.parse(domains),
        actions: JSON.parse(actions),
        contexts: JSON.parse(contexts),
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

      if (contexts) {
        const parsedContexts = JSON.parse(contexts);
        Object.values(parsedContexts).forEach(context => {
          dispatch(addContextToCreate(context));
        })
      } else {
        Object.values(defaultContexts).forEach(context => {
          dispatch(addContextToCreate(context));
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

    const stringContexts = JSON.stringify(createData.contexts);
    if (stringContexts) {
      localStorage.setItem('createcontexts', stringContexts);
    }
  }, [createData])


  function prepareData() {
    let domains = Object.values(createData.domains).map(domain => ({ ...domain }));
    let contexts = Object.values(createData.contexts).map(context => ({ ...context }))
    for (let i = 0; i < domains.length; i++) {
      domains[i].staticActions = [...domains[i].staticActions];
      domains[i].dynamicActions = [...domains[i].dynamicActions];
      for (let j = 0; j < domains[i].staticActions.length; j++) {  
        domains[i].staticActions[j] = createData.actions[domains[i].staticActions[j].id];
      }
      for (let k = 0; k < domains[i].dynamicActions.length; k++) {  
        domains[i].dynamicActions[k] = createData.actions[domains[i].dynamicActions[k].id];
      }
    }

    for (let i = 0; i < contexts.length; i++) {
      contexts[i].staticActions = [...contexts[i].staticActions];
      for (let j= 0; j < contexts[i].staticActions.length; j++) {  
        contexts[i].staticActions[j] = createData.actions[contexts[i].staticActions[j].id];
      }
    }

    let objectifiedDomains = {};
    let objectifiedContexts = {};
    let objectifiedQualities = {};

    domains.forEach(domain => {
      objectifiedDomains[domain.id] = domain;
    }); 

    contexts.forEach(context => {
      objectifiedContexts[context.id] = context;
    }); 

    let qualities = Object.values(createData.qualities).map(quality => ({ ...quality }));

    for (let quality of qualities) {
      let processedDescriptions = {};
      if (quality.descriptions.length > 0) {
        quality.descriptions.forEach(d => {
          processedDescriptions[d.value] = d.description
        });
      } else {
        processedDescriptions = {1: ''};
      }  
      let processedAlts = {}
      if (quality.alts && quality.alts.length > 0) {
        quality.alts.forEach(a => {
          processedAlts[a.value] = a.alt;
        }) 
      } else {
        processedAlts = null;
      }
      quality.descriptions = processedDescriptions;
      quality.alts = processedAlts;
      objectifiedQualities[quality.id] = quality;
    }


    const stringQualities = JSON.stringify(objectifiedQualities);
    const stringDomains = JSON.stringify(objectifiedDomains);
    const stringContexts = JSON.stringify(objectifiedContexts);

    return { stringQualities, stringDomains, stringContexts }
  }

  function clickPlay() {
    const { stringQualities, stringDomains, stringContexts } = prepareData();
    const data = '{"source":"storage"}';
    
    localStorage.setItem('data', data);
    localStorage.setItem('playqualities', stringQualities );
    localStorage.setItem('playdomains', stringDomains );
    localStorage.setItem('playcontexts', stringContexts );

    window.location = '/';

  }

  function clickExport() {
    const { stringQualities, stringDomains, stringContexts } = prepareData();
    const exportedWorld = "const domains = " + stringDomains + "; const qualities = " + stringQualities + "; const contexts = " + stringContexts + "; export { domains, qualities, contexts }";
    
    download(exportedWorld, 'world.js', 'text/plain')
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
      <DownloadButton onClick={clickPlay}><p>Play World</p></DownloadButton>
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
        {activeList.first==="contexts" && createData.contexts
          ? <ItemsList items={Object.values(createData.contexts)} title="Contexts" type="contexts" /> 
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
        {activeList.second==="contexts" && createData.contexts
          ? <ItemsList items={Object.values(createData.contexts)} title="Contexts" type="contexts" /> 
          : null 
        }
      </CreateInterfaceDiv>
    </CreateDiv>
  )
}

export default Create;