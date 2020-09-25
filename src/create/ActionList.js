import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Item from './Item';
import { green } from  '../style/colors';
import {
  deleteSomethingFromCreate,
  addActionToCreate,
  addActionToParent,
  selectCreate, deleteActionFromParent 
} from './createToolsSlice';
import { CreateTitle } from '../style/typography';
import NewActionForm from './forms/NewActionForm';

const ItemListDiv = styled.div`
  background-color: white;
  color: black;
  padding: 15px;
  border-radius: 3px;
  font-size: 1.2em;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const ItemsDiv = styled.div`
  flex: 0 1 20%;
  margin-right: 20px;
  
  input {
    padding: 5px;
  }
  
  select {
    width: 150px;
    padding: 5px;
  }

  form {
    margin-bottom: 8px;
  }
`

const NewItemButton = styled.div`
  position: relative;
  height: 30px;
  color: white;
  background-color: ${green};
  margin: 10px 0px;
  cursor:pointer;
  border-radius: 3px;
  p {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`

function ActionList({ items=null }) {
  const dispatch = useDispatch();
  const createData = useSelector(selectCreate);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterField, setFilterField] = useState('');
  const [selectedParentType, setSelectedParentType] = useState('domains');
  const [selectedParentId, setSelectedParentId] = useState('1');
  const [parentOptions, setParentOptions] = useState([]);
  const [selectedActions, setSelectedActions] = useState(createData.domains["1"].actions);

  useEffect(function gatherParentIds() {
    const domainIds = Object.values(createData.domains).map(i => <option key={i.id} value={i.id}>{i.title}</option>);
    const contextIds = Object.values(createData.contexts).map(i => <option key={i.id} value={i.id}>{i.title}</option>);
    const eventIds = Object.values(createData.events).map(i => <option key={i.id} value={i.id}>{i.title}</option>);
  
    const allIds = [
      <optgroup key="domainLabel" label="Domains">, {domainIds}, </optgroup>, 
      <optgroup key="contextLabel" label="Contexts">, {contextIds}, </optgroup>,
      <optgroup key="eventLabel" label="Events">, {eventIds}, </optgroup>
    ]

    setParentOptions(allIds);
  }, [createData])


  function selectItem(itemId) {
    const foundItem = createData.actions[itemId];
    setSelectedItem(foundItem);
  }

  function deleteItem(itemId) {
    dispatch(deleteActionFromParent({
      actionId: itemId, 
      parentId: selectedParentId, 
      parentType: selectedParentType
    }));
    dispatch(deleteSomethingFromCreate({id: itemId, type: "actions"}));
    setSelectedItem(null);
  }
  
  function liveFilter(evt) {
    setFilterField(evt.target.value);
    let filterResults = selectedActions.filter(
      item => item.title.toLowerCase().includes(filterField.toLowerCase())
    )
    setFilteredItems(filterResults)
  }

  useEffect(function gatherSelectedActions() {
    if (createData[selectedParentType][selectedParentId]) {
      let selectedActionIds = [];
      selectedActionIds = createData[selectedParentType][selectedParentId].actions;

      let targetActions = [];
      for (let action of selectedActionIds) {
        const { id, title } = createData.actions[action.id];
        targetActions.push({id, title});
      }
      setSelectedActions(targetActions);
    } else {
      setSelectedActions([]);
      setSelectedParentId("1")
      setSelectedParentType("domains");
    }
  }, [createData, selectedParentId, selectedParentType])

  function selectParentId(evt) {
    const targetParentId = evt.target.value;
   
    if (createData.domains[targetParentId]) {
      // targetParent = createData.domains[targetParentId]
      setSelectedParentType("domains");
    } else if (createData.contexts[targetParentId]) {
      // targetParent = createData.contexts[targetParentId]
      setSelectedParentType("contexts");
    } else if (createData.events[targetParentId]) {
      // targetParent = createData.events[targetParentId]
      setSelectedParentType("events");
    }
    setSelectedParentId(targetParentId); 
    setSelectedItem(null); 
  }

  function addNew() {
    let newItem = {
      id: uuidv4(),
      title: 'New Action',
      text: 'Action text',
      dynamic: false,
      results: {
        remain: false,
        context: "",
        type: "modify",
        luck: false,
        hide: false,
        changes: [],
        report: {
          title: "Report Title",
          text: "Report text."
        },
        success: {
          changes: [],
          report: {
            title: "Success Report Title",
            text: "Success report text."
          },
        },
        failure: {
          changes: [],
          report: {
            title: "Failure Report Title",
            text: "Failure report text."
          },
        },
      },
      reveal: {
        type: "all",
      },
      reqs: [],
    }
    dispatch(addActionToCreate(newItem));
    dispatch(addActionToParent({
      parentType: selectedParentType,
      parentId: selectedParentId,
      newAction: {id: newItem.id},
    }))
    setSelectedActions(() => [...selectedActions, newItem]); 
    setSelectedItem(newItem);
  }

  let displayedItems;
  if (selectedActions.length > 0) {
    displayedItems = filterField.length > 2 
      ? filteredItems.map(item => 
        <Item 
          key={item.id} 
          data={item} 
          select={selectItem}
          active={selectedItem && selectedItem.id === item.id ? true : false}
        />) 
      : selectedActions.map(item => 
        <Item 
          key={item.id} 
          data={item} 
          select={selectItem}
          active={selectedItem && selectedItem.id === item.id ? true : false}
        />)
  } else {
    displayedItems = "Parent has no actions."
  }
  
  if (items) {
    return (
      <ItemListDiv>
        <CreateTitle>Actions</CreateTitle>
        <ItemsContainer>
          <ItemsDiv>
            <form autoComplete="off">
              <label htmlFor="parent">Parent:</label>
              <select name="parent" onChange={selectParentId} value={selectedParentId}>
                {parentOptions}    
              </select>  
            </form> 
            <form autoComplete="off">
              <label htmlFor="filter">Filter:</label>
              <input type="text" name="filter" onChange={liveFilter} value={filterField} />
            </form>
            <NewItemButton onClick={addNew}><p>+ Add New</p></NewItemButton>
            {displayedItems}
          </ItemsDiv>
          {selectedItem
            ? <NewActionForm 
                data={selectedItem} 
                deleteItem={deleteItem} 
                createData={createData} 
                parentType={selectedParentType}
                parentId={selectedParentId} 
              />
            : null
          }
        </ItemsContainer> 
      </ItemListDiv>
    )
  }

  return ( 
    <ItemListDiv>
      No items found.
    </ItemListDiv>
  )
}

export default ActionList;