import React from 'react';
import styled from 'styled-components';

const NavbarDiv=styled.div`
  position: fixed;
  top: 12px;
  ${props => props.reverse ? "right: 12px;" : "left: 12px;"}
  background-color: white;
  color: black;
  padding: 12px; 
  border-radius: 3px;
  border: 1px solid #000;
  display: flex;
  z-index: 10;


  div {
    flex: 0 1 auto;
    border-radius: 3px;
    border: 1px solid black;
    padding: 10px;
    cursor: pointer;
  }
  div ~ div {
    margin-left: 12px;
  }

  p {
    pointer-events: none;
  }
`
function Navbar({ setList, reverse=false }) {
  
  function selectList(event) {
    setList(event.target.dataset.listtype)
  }
  
  return (
    <NavbarDiv reverse={reverse}>
      <div data-listtype="qualities" onClick={selectList}><p>Qualities</p></div>
      <div data-listtype="domains" onClick={selectList}><p>Domains</p></div>
      <div data-listtype="storylets" onClick={selectList}><p>Storylets</p></div>
      <div data-listtype="actions" onClick={selectList}><p>Actions</p></div>
    </NavbarDiv>
  )
}

export default Navbar;