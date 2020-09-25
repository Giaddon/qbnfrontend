import React from 'react';
import styled from 'styled-components';
import { navbar } from '../style/colors';

const ItemDiv = styled.div`
  border: 1px solid ${props => props.active ? `${navbar};` : "black;"}
  border-radius: 3px;
  padding: 5px;
  cursor:pointer;
  background-color: ${props => props.active ? `${navbar};` : "white;"}
  color: ${props => props.active ? "white;" : "black;"}
  transition: background-color .2s ease;
  &~& {
    margin-top: 10px;
  }
`

function Item({ data=null, select, active }) {
  function clickItem() {
    select(data.id);
  }
  if (data) {
    return (
      <ItemDiv onClick={clickItem} active={active}>
        <p>{data.name ? data.name : data.title}</p>
      </ItemDiv>
    )
  }

  return <ItemDiv>No data found.</ItemDiv>
}

export default Item;