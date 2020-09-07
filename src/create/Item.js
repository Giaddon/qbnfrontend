import React from 'react';
import styled from 'styled-components';

const ItemDiv = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
  cursor:pointer;
  &~& {
    margin-top: 10px;
  }
`

function Item({ data=null, select }) {
  function clickItem() {
    select(data.id);
  }
  if (data) {
    return (
      <ItemDiv onClick={clickItem}>
        <p>{data.name ? data.name : data.title}</p>
      </ItemDiv>
    )
  }

  return <ItemDiv>No data found.</ItemDiv>
}

export default Item;