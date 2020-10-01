import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { 
  addQualityToCreate, 
  addDomainToCreate, 
  addActionToCreate, 
  selectCreate, 
  setAllCreate,
  addContextToCreate,
  addEventToCreate,
 } from './createToolsSlice';
import { 
  defaultQualities, 
  defaultDomains, 
  defaultActions, 
  defaultContexts, 
  defaultEvents 
} from './defaults/defaultData'; 
import ItemsList from './ItemList';
import Navbar from './Navbar';
import ActionList from './ActionList';
import DataFunctions from './DataFunctions';

const CreateDiv = styled.div`
  margin: 0 auto;
  text-align: center;
  color: black;
  font-family: "IBMPlexSerif", serif;
  font-size: 1.2em;
  max-width: 1920px;
  background-color: white;
  height: 100vh;
  overflow: hidden; 
`

const CreateInterfaceDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;
`
const SideDiv = styled.div`
  flex: 1 1 50%;
  overflow-y: scroll;
  height: 100vh;
  padding-bottom: 70px;
  max-width: 960px;
`

function Create() {
  const dispatch = useDispatch();
  const createData = useSelector(selectCreate);
  const [activeList, setActiveList] = useState({left: null, right: null});

  useEffect(function createCheckforDataOnInitialMount() {
    const {qualities, domains, actions, contexts, events } = {
      qualities: localStorage.getItem('createqualities'), 
      domains: localStorage.getItem('createdomains'),
      actions: localStorage.getItem('createactions'),
      contexts: localStorage.getItem('createcontexts'),
      events: localStorage.getItem('createevents'),
    }

    if(qualities && domains && actions && contexts && events) {
      const createState = {
        qualities: JSON.parse(qualities),
        domains: JSON.parse(domains),
        actions: JSON.parse(actions),
        contexts: JSON.parse(contexts),
        events: JSON.parse(events),
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
      
      if (events) {
        const parsedEvents = JSON.parse(events);
        Object.values(parsedEvents).forEach(event => {
          dispatch(addEventToCreate(event));
        })
      } else {
        Object.values(defaultEvents).forEach(event => {
          dispatch(addEventToCreate(event));
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
    const stringEvents = JSON.stringify(createData.events);
    if (stringEvents) {
      localStorage.setItem('createevents', stringEvents);
    }

  }, [createData])

  function clickPlay() {
    const { stringQualities, stringDomains, stringContexts, stringEvents } = DataFunctions.prepareData(createData);
    const stringData = localStorage.getItem("data");
    let data;
    if (stringData) {
      data = JSON.parse(stringData);
      data = {...data, source: "preview"};
      data = JSON.stringify(data);
    } else {
      data = '{"source":"preview"}';
    }
    
    localStorage.setItem('data', data);
    localStorage.setItem('playqualities', stringQualities);
    localStorage.setItem('playdomains', stringDomains);
    localStorage.setItem('playcontexts', stringContexts);
    localStorage.setItem('playevents', stringEvents);

    window.location = '/';
  }

  function setList({side, type}){
    if (activeList[side] !== type) {
      setActiveList({...activeList, [side]: type});
    }
    else {
      setActiveList({...activeList, [side]: null});
    }
  }

  return (
    <CreateDiv>
      <Navbar setList={setList} clickPlay={clickPlay} />
      <CreateInterfaceDiv>
        <SideDiv>
          {activeList.left==="Qualities" 
            ? <ItemsList items={Object.values(createData.qualities)} title="Qualities" type="qualities" />  
            : null
          }
          {activeList.left==="Domains" 
            ? <ItemsList items={Object.values(createData.domains)} title="Domains" type="domains" /> 
            : null 
          }
          {activeList.left==="Actions" 
            ? <ActionList items={Object.values(createData.actions)} /> 
            : null 
          }
          {activeList.left==="Contexts" && createData.contexts
            ? <ItemsList items={Object.values(createData.contexts)} title="Contexts" type="contexts" /> 
            : null 
          }
          {activeList.left==="Events" && createData.events
            ? <ItemsList items={Object.values(createData.events)} title="Events" type="events" /> 
            : null 
          }
        </SideDiv>
        <SideDiv>
          {activeList.right==="Qualities" 
            ? <ItemsList items={Object.values(createData.qualities)} title="Qualities" type="qualities" />  
            : null
          }
          {activeList.right==="Domains" 
            ? <ItemsList items={Object.values(createData.domains)} title="Domains" type="domains" /> 
            : null 
          }
          {activeList.right==="Actions" 
            ? <ActionList items={Object.values(createData.actions)} /> 
            : null 
          }
          {activeList.right==="Contexts" && createData.contexts
            ? <ItemsList items={Object.values(createData.contexts)} title="Contexts" type="contexts" /> 
            : null 
          }
          {activeList.right==="Events" && createData.events
            ? <ItemsList items={Object.values(createData.events)} title="Events" type="events" /> 
            : null 
          }
        </SideDiv>
      </CreateInterfaceDiv>
    </CreateDiv>
  )
}

export default Create;