import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectCreate } from '../createToolsSlice';
import { CreateFormDiv } from './formStyles';
import { ActionModifyForm, ActionStoryletForm, ActionChallengeForm } from './actionTypeForms';

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
  const [type, setType] = useState('');
  
  useEffect(function resetType() {
    if (data) setType(data.type);
  }, [data])
  
  
  function selectType(evt) {
    setType(evt.target.value);
  }

  function deleteQuality() {
    deleteItem(data.id);
  }

  let displayedForm;

  if (type==="modify") displayedForm = <ActionModifyForm data={data} createData={createData} />
  if (type==="storylet") displayedForm = <ActionStoryletForm data={data} createData={createData} />
  if (type==="challenge") displayedForm = <ActionChallengeForm data={data} createData={createData} />

  if (!data) return null;

  return (
    <CreateFormDiv>
      <p>ID: {data.id}</p>
      <label htmlFor="action-type" style={{ display: "block" }}>
                Action Type</label>
      <select name="action-type" onChange={selectType} value={type}>
        <option value="modify">Modify</option>
        <option value="storylet">Storylet</option>
        <option value="challenge">Challenge</option>
      </select>
    
      {displayedForm}

      {data.id === "1" ? null : <FormDeleteButton onClick={deleteQuality}><p>Delete Action</p></FormDeleteButton>}
    </CreateFormDiv>
  )
}

export default ActionForm;