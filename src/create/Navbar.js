import React, { useState } from 'react';
import styled from 'styled-components';
import NavbarButton from './NavbarButton';

const NavbarDiv = styled.div`
  position: fixed;
  bottom: 0px;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: baseline;
  background-color: white;
  color: black;
  padding: 6px; 
  border-top: 1px solid black;
  display: flex;
  z-index: 10;
  width: 100%;
  max-width: 1920px;

  p {
    pointer-events: none;
  }
`

const DownloadButton = styled.div`
  font-family: "Alata", sans-serif;
  font-size: 1.4em;
  color: white;
  max-width: 300px;
  height: 35px;
  background-color: skyblue;
  padding: 5px 25px;
  border-radius: 2px;
  cursor: pointer;
  flex: 0 1 auto;
  transition: background .2s ease;
  margin: 10px;
`

function Navbar({ setList, clickExport, clickPlay }) {
  const [highlights, setHighlights] = useState({left: null, right: null});

  function changeHighlights({side, type}) {
    if (highlights[side] !== type) {
      setHighlights({...highlights, [side]: type});
    } else {
      setHighlights({...highlights, [side]: null});
    }
  }

  return (
    <NavbarDiv>
      <DownloadButton onClick={clickPlay}><p>Play World</p></DownloadButton>
      <NavbarButton 
        type="Qualities" 
        setList={setList} 
        highlights={highlights}
        changeHighlights={changeHighlights} 
      />
      <NavbarButton 
        type="Domains" 
        setList={setList} 
        highlights={highlights}
        changeHighlights={changeHighlights} 
      />
      <NavbarButton 
        type="Contexts" 
        setList={setList} 
        highlights={highlights}
        changeHighlights={changeHighlights} 
      />
      <NavbarButton 
        type="Events" 
        setList={setList} 
        highlights={highlights}
        changeHighlights={changeHighlights}
      />
      <NavbarButton 
        type="Actions" 
        setList={setList} 
        highlights={highlights}
        changeHighlights={changeHighlights}
      />
      <DownloadButton onClick={clickExport}><p>Download World</p></DownloadButton>
    </NavbarDiv>
  )
}

export default Navbar;