import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectCreate } from '../createToolsSlice';
import { CreateFormDiv } from './formStyles';
import NewActionForm from './NewActionForm';

const FormDeleteButton = styled.div`
  position: relative;
  height: 30px;
  color: white;
  margin: auto;
  max-width: 200px;
  background-color: tomato;
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

function ActionForm({ data, deleteItem }) {
  const createData = useSelector(selectCreate);
  
  function deleteQuality() {
    deleteItem(data.id);
  }

  if (!data) return null;

  return (
    <CreateFormDiv>
      <p>ID: {data.id}</p>
      <NewActionForm data={data} createData={createData} />
      {data.id === "1" ? null : <FormDeleteButton onClick={deleteQuality}><p>Delete Action</p></FormDeleteButton>}
    </CreateFormDiv>
  )
}

export default ActionForm;