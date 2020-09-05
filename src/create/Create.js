import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import download from 'downloadjs';

import { addQualityToCreate, selectCreate } from './createToolsSlice';
import defaultQualities from './defaults/defaultQualities'; 
import ItemsList from './ItemList';

const CreateDiv = styled.div`
  margin: 0 auto;
  text-align: center;
  color: white;
  font-family: "IBMPlexSerif", serif;
  font-size: 1.2em;
  width: 90%;
  max-width: 1100px;
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

function Create() {
  const dispatch = useDispatch();
  const createData = useSelector(selectCreate);

  useEffect(function createCheckforDataOnInitialMount() {
    const createQualities = localStorage.getItem('createqualities');
    if (createQualities) { // Can we find data already in localstorage? 
      const parsedQualities = JSON.parse(createQualities);
      Object.values(parsedQualities).forEach(quality => {
        dispatch(addQualityToCreate(quality));
      })
    } else { // If not, load the defaults.
      Object.values(defaultQualities).forEach(quality => {
        dispatch(addQualityToCreate(quality));
      })
    }

  },[dispatch])
  
  useEffect( function storeDataInLocalStorage() {
    const stringQualities = JSON.stringify(createData.qualities);
    localStorage.setItem('createqualities', stringQualities);
  }, [createData])

  function clickExport() {
    const createQualities = localStorage.getItem('createqualities');
    const exportedQualities = "const qualities = " + createQualities + "; export { qualities }";
    download(exportedQualities, 'qualities.js', 'text/plain')
  }

  return (
    <CreateDiv>
      <CreateTitle>CREATE</CreateTitle>
      <DownloadButton onClick={clickExport}><p>Download World</p></DownloadButton>
      <ItemsList items={Object.values(createData.qualities)} />  
    </CreateDiv>
  )
}

export default Create;