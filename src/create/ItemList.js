import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Item from './Item';
import QualityForm from './forms/QualityForm';
import DomainForm from './forms/DomainForm';
import EventForm from './forms/EventForm';
import ContextForm from './forms/ContextForm';
import { green } from  '../style/colors';
import {
  addQualityToCreate, 
  deleteSomethingFromCreate, 
  addDomainToCreate, 
  addContextToCreate, 
  addEventToCreate,  
} from './createToolsSlice';
import { CreateTitle } from '../style/typography';

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

function ItemList({ items=null, type, title }) {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterField, setFilterField] = useState('');

  function selectItem(itemId) {
    const foundItem = items.filter(item => item.id === itemId );
    setSelectedItem(foundItem[0]);
  }

  function deleteItem(itemId) {
    setSelectedItem(null);
    if (type !== "qualities") {
      for (let action of selectedItem.actions) {
        dispatch(deleteSomethingFromCreate({id: action.id, type: "actions"}));
      }
    } 
    dispatch(deleteSomethingFromCreate({id: itemId, type}));
  }

  function liveFilter(evt) {
    setFilterField(evt.target.value);
    let filterResults = [];

    if (type === "qualities"){
      filterResults = items.filter(item => item.name.toLowerCase().includes(filterField.toLowerCase()))
    }
    else if (type === "domains" || type === "contexts" || type === "events") {
      filterResults = items.filter(item => item.title.toLowerCase().includes(filterField.toLowerCase()))
    }
    setFilteredItems(filterResults)
  }

  function addNew() {
    let newItem;
    if (type === "qualities") {
      newItem = {
        id: uuidv4(),
        name: 'New Quality',
        descriptions: [
          {
            value: 1,
            description: "Quality description",
          },
        ],
        alts: [],
        value: 0,
        category: '',
        context: '',
        creatorPinned: false,
        invisible: false,
      }
      dispatch(addQualityToCreate(newItem));

    } else if (type === 'domains') {
      let nextId = 2;
      items.forEach(domain => {
        if (domain.id >= nextId) nextId = domain.id + 1;
      })
      newItem = {
        id: nextId,
        title: 'New Domain',
        text: 'Domain text.',
        actions: [],
        locked: false,
        discoverable: false,
        availableAtStart: false,
      }
      dispatch(addDomainToCreate(newItem));

    } else if (type === 'contexts') {
    newItem = {
      id: uuidv4(),
      title: 'New Context',
      text: 'Context text.',
      actions: [],
      locked: false,
    }
    dispatch(addContextToCreate(newItem));

  } else if (type === 'events') {
    newItem = {
      id: uuidv4(),
      title: 'New Event',
      text: 'Event text.',
      actions: [],
      locked: true,
      priority: 1,
      triggers: [],
    }
    dispatch(addEventToCreate(newItem));
  }
    setSelectedItem(newItem);
  }

  const displayedItems = filterField.length > 2 
    ? filteredItems.map(item => 
      <Item 
        key={item.id} 
        data={item} 
        type={type} 
        select={selectItem} 
        active={selectedItem && selectedItem.id === item.id ? true : false} 
      />) 
    : items.map(item => 
      <Item 
        key={item.id} 
        data={item} 
        select={selectItem} type={type} 
        active={selectedItem && selectedItem.id === item.id ? true : false} 
      />)
  let activeForm;
  if (type === "qualities") activeForm =  <QualityForm data={selectedItem} deleteItem={deleteItem} />
  else if (type === "domains") activeForm =  <DomainForm data={selectedItem} deleteItem={deleteItem} />
  else if (type === "contexts") activeForm =  <ContextForm data={selectedItem} deleteItem={deleteItem} />
  else if (type === "events") activeForm =  <EventForm data={selectedItem} deleteItem={deleteItem} />

  if (items) {
    return (
      <ItemListDiv>
        <CreateTitle>{title}</CreateTitle>
        <ItemsContainer> 
          <ItemsDiv>
            <form autoComplete="off">
              <label htmlFor="filter">Filter:
              <input type="text" name="filter" onChange={liveFilter} value={filterField} /></label>
            </form>
            <NewItemButton onClick={addNew}><p>+ Add New</p></NewItemButton>
            {displayedItems}
          </ItemsDiv>
         {activeForm}
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

export default ItemList;