import React, { useState, useEffect } from 'react';
import download from 'downloadjs';

import styled from 'styled-components';
import { forbidden, navbar } from '../style/colors';
import { SidebarText, Title } from '../style/typography';
import DataFunctions from '../create/DataFunctions';

const DataDiv = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 1075px;
  background-color: white;
  border-radius: 2px;
  div {
    margin-top: 3px;
    margin-bottom: 12px;
  }
  label {
    font-size: 1.4em;
    margin-right: 6px;
  }
`
const RadioGroup = styled.div`
  border: 1px dotted black;
  max-width: 200px;
  border-radius: 2px;
  padding: 5px;

  input {
    margin-right: 15px;
  }
`
const DataButton = styled.div`
  border-radius: 2px;
  max-width: 150px;
  color: white;
  text-align: center;
  padding: 10px;
  cursor: ${props => props.disabled ? "default;" : "pointer;"}
  ${props => props.delete ? `background-color: ${forbidden};` : `background-color: ${navbar};`}
  ${props => props.disabled ? "background-color: lightgrey;" : null}
`

const SectionDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
`

const SectionCellDiv = styled.div`
  flex: 0 1 250px;
`

function Data() {
  const [autosave, setAutosave] = useState(false);
  const [dataSource, setDataSource] = useState("server");
  const [previewReady, setPreviewReady] = useState(false);
  const [uploadReady, setUploadReady] = useState(false);
  const [createReady, setCreateReady] = useState(false);

  useEffect(function prepareStateOnMount() {  
    const stringLocalData = localStorage.getItem("data");
    const stringPlayDomains = localStorage.getItem("playdomains");
    const stringPlayQualities = localStorage.getItem("playqualities");
    const stringUploadDomains = localStorage.getItem("uploaddomains");
    const stringUploadQualities = localStorage.getItem("uploadqualities")
    const stringCreateQualities = localStorage.getItem("createqualities")
    const stringCreateDomains = localStorage.getItem("createdomains")

    function gatherDataFromStorageToPopulateForms() {
      const localData = JSON.parse(stringLocalData);
      const autosaveValue = localData.autosave || false;
      const dataSourceValue = localData.source || "server";
    
      setAutosave(autosaveValue);
      setDataSource(dataSourceValue);
    }
    
    if (stringLocalData) gatherDataFromStorageToPopulateForms();
    
    if (stringPlayDomains && stringPlayQualities) setPreviewReady(true);
    if (stringUploadDomains && stringUploadQualities) setUploadReady(true);
    if (stringCreateDomains && stringCreateQualities) setCreateReady(true);

  }, []);

  useEffect(function saveDataToStorage() {
    const data = {source: dataSource, autosave};
    const stringData = JSON.stringify(data);

    localStorage.setItem("data", stringData);
  }, [autosave, dataSource])

  function changeAutosave(evt) {
    const newValue = evt.target.value === "on" ? true : false;
    setAutosave(newValue);
  }

  function changeDataSource(evt) {
    setDataSource(evt.target.value);
  }

  function deleteCreate() {
    if (createReady) {
      if (window.confirm("Warning: this will permanently erase the data stored by the creation tools.")) {
        localStorage.removeItem("createactions");
        localStorage.removeItem("createevents");
        localStorage.removeItem("createdomains");
        localStorage.removeItem("createqualities");
        localStorage.removeItem("createcontexts");
        setCreateReady(false);
      }
    }
  }

  function deletePreview() {
    if (previewReady) {
      if (window.confirm("Warning: this will permanently erase the creation tools preview.")) {
        localStorage.removeItem("playevents");
        localStorage.removeItem("playdomains");
        localStorage.removeItem("playqualities");
        localStorage.removeItem("playcontexts");
        setPreviewReady(false);
      }
    }
  }

  function deleteUpload() {
    if (uploadReady) {
      if (window.confirm("Warning: this will permanently erase the uploaded world data.")) {
        localStorage.removeItem("uploadevents");
        localStorage.removeItem("uploaddomains");
        localStorage.removeItem("uploadqualities");
        localStorage.removeItem("uploadcontexts");
        setUploadReady(false);
      }
    }
  }

  // function uploadCreate(evt) {
  //   const newWorld = evt.target.files[0];
  //   if (newWorld) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => parseAndStoreUploadedData(e.target.result);
  //     reader.readAsText(newWorld)
  //   }

  //   function parseAndStoreUploadedData(world) {
      
  //   }
  // }

  function uploadWorld(evt) {
    const newWorld = evt.target.files[0];
    if (newWorld) {
      const reader = new FileReader();
      reader.onload = (e) => parseAndStoreUploadedData(e.target.result);
      reader.readAsText(newWorld)
    }

    function parseAndStoreUploadedData(world) {
      const {qualities, domains, events, contexts} = JSON.parse(world);
      localStorage.setItem("uploadqualities", JSON.stringify(qualities));
      localStorage.setItem("uploaddomains", JSON.stringify(domains));
      localStorage.setItem("uploadcontexts", JSON.stringify(contexts));
      localStorage.setItem("uploadevents", JSON.stringify(events));
      setUploadReady(true);
      setDataSource("uploaded");
    }
  }

  function serverExport() {
    
    const createData = DataFunctions.getCreateDataFromStorage();
    
    const { 
      stringQualities, 
      stringDomains, 
      stringContexts, 
      stringEvents } = DataFunctions.prepareData(createData);
    
      const exportedWorld = "const domains = " + stringDomains + "; const qualities = " + stringQualities + "; const events = " + stringEvents + "; const contexts = " + stringContexts + "; export { domains, qualities, contexts, events }";
    
    download(exportedWorld, 'world-for-server.js', 'text/plain')
  }

  function worldExport() {
    const createData = DataFunctions.getCreateDataFromStorage();
    
    const { 
      stringQualities, 
      stringDomains, 
      stringContexts, 
      stringEvents } = DataFunctions.prepareData(createData);

    const parsedWorld = {
      qualities: JSON.parse(stringQualities),
      domains: JSON.parse(stringDomains),
      contexts: JSON.parse(stringContexts),
      events: JSON.parse(stringEvents)
    }  

    const exportedWorld = JSON.stringify(parsedWorld);
    download(exportedWorld, 'world.js', 'text/plain');
    
  }

  return (
    <DataDiv>
      <Title>Data Management</Title>
      <div>
        <Title>Auto Save</Title>
        <RadioGroup>
          <form>
            <div>
              <label htmlFor="on">On</label>
              <input 
                type="radio" 
                id="on" 
                name="auto-save" 
                value="on" 
                checked={autosave}
                onChange={changeAutosave} 
              />
            </div>
            <div>
              <label htmlFor="off">Off</label>
              <input 
                type="radio" 
                id="off" 
                name="auto-save" 
                value="off" 
                checked={!autosave}
                onChange={changeAutosave} 
              />
            </div>
          </form>
        </RadioGroup>  
      </div>
      <div>
        <Title>World Source</Title>
        <RadioGroup>
          <div>
            <label htmlFor="server">Server</label>
            <input 
              type="radio" 
              id="server" 
              name="data-source" 
              value="server" 
              checked={dataSource === "server"}
              onChange={changeDataSource}  
            />
          </div>
          <div>
            <label htmlFor="preview">Creation Tools Preview</label>
            <input 
              type="radio" 
              id="preview" 
              name="data-source" 
              value="preview"
              checked={dataSource === "preview"}
              onChange={changeDataSource}   
              disabled={!previewReady}
            />
          </div>
          <div>
            <label htmlFor="uploaded">Uploaded World</label>
            <input 
              type="radio" 
              id="uploaded" 
              name="data-source" 
              value="uploaded" 
              checked={dataSource === "uploaded"}
              onChange={changeDataSource}    
              disabled={!uploadReady}
            />
          </div>
        </RadioGroup> 
      </div>
      <SectionDiv>
      <SectionCellDiv>
        <Title>Export Data</Title>
        <DataButton onClick={serverExport} disabled={!createReady}>
          <SidebarText>Export World for Server Build</SidebarText>
        </DataButton>
        <DataButton onClick={worldExport} disabled={!createReady}>
          <SidebarText>Export World for Upload</SidebarText>
        </DataButton>
      </SectionCellDiv>
      <SectionCellDiv>
        <Title>Delete Data</Title>
        <DataButton onClick={deleteCreate} disabled={!createReady} delete={true}>
          <SidebarText>Delete Creation Tools Data</SidebarText>
        </DataButton>
        <DataButton onClick={deletePreview} disabled={!previewReady} delete={true}>
          <SidebarText>Delete Preview Data</SidebarText>
        </DataButton>
        <DataButton onClick={deleteUpload} disabled={!uploadReady} delete={true}>
          <SidebarText>Delete Uploaded World Data</SidebarText>
        </DataButton>
      </SectionCellDiv>
      <SectionCellDiv>
        <Title>Upload Data</Title>
        {/* <div>
          <label htmlFor="uploadCreate">Upload World for Creation Tools</label>
          <input type="file" name="uploadCreate" onChange={uploadCreate} />
        </div> */}
        <div>
          <label htmlFor="uploadWorld">Upload World to Play</label>
          <input type="file" name="uploadWorld" onChange={uploadWorld} />
        </div>
      </SectionCellDiv>
      </SectionDiv>

    </DataDiv>
  ) 
}

export default Data;