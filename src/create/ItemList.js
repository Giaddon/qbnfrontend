import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Item from './Item';
import QualityForm from './forms/QualityForm';
import { green } from  '../typography/colors';
import { addQualityToCreate, deleteQualityFromCreate } from './createToolsSlice';

const ItemListDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background-color: white;
  color: black;
  padding: 15px;
  border-radius: 3px;
  font-size: 1.2em;
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
  margin-top:10px;
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

function ItemList({ items=null }) {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterField, setFilterField] = useState('');

  function selectItem(itemId) {
    const foundItem = items.filter(item => item.id === itemId );
    setSelectedItem(foundItem[0]);
  }

  function deleteItem(itemId) {
    dispatch(deleteQualityFromCreate(itemId))
    setSelectedItem(null);
  }
  
  function liveFilter(evt) {
    setFilterField(evt.target.value);
    const filterResults = items.filter(item => item.name.toLowerCase().includes(filterField.toLowerCase()))
    setFilteredItems(filterResults)
  }

  function addNew() {
    const newItem = {
      id: uuidv4(),
      name: 'New Item',
      description: '',
      block: '',
    }

    dispatch(addQualityToCreate(newItem));
    setSelectedItem(newItem);
  }

  const displayedItems = filterField.length > 2 ? filteredItems.map(item => <Item key={item.id} data={item} select={selectItem} />) : items.map(item => <Item key={item.id} data={item} select={selectItem} />)

  if (items) {
    return (
      <ItemListDiv>
        <ItemsDiv>
          <form autoComplete="off">
            <label htmlFor="filter">Filter:
            <input type="text" name="filter" onChange={liveFilter} value={filterField} /></label>
          </form>
          {displayedItems}
          <NewItemButton onClick={addNew}><p>+ Add New</p></NewItemButton>
        </ItemsDiv>
        <QualityForm data={selectedItem} deleteItem={deleteItem} />
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