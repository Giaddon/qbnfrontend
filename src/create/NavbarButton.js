import React from 'react';
import styled from 'styled-components';

const NavbarButtonDiv = styled.div`
  flex: 0 1 auto;
  border-radius: 2px;
  border: 1px solid black;
  padding: 10px;
  
  
  & ~ & {
    margin-left: 10px;
  }

  div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-content: center;
    div ~ div {
      margin-left: 5px;
    }
  }
`

const LeftButton = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  height: 15px;
  width: 25px;
  cursor: pointer;
  flex: 0 1 auto;
  background-color: ${props => props.active ? "grey;" : "white;"}
  transition: background-color .2s ease;
  
  :hover {
    background-color: lightgrey;
  }
`

const RightButton = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  height: 15px;
  width: 25px;
  cursor: pointer;
  flex: 0 1 auto;
  transition: background-color .2s ease;
  background-color: ${props => props.active ? "grey;" : "white;"}

  :hover {
    background-color: lightgrey;
  }
`

function NavbarButton({type, setList, changeHighlights, highlights}) {
  
  function clickSide(side) {
    setList({side, type});
    changeHighlights({side, type});
  }

  return (
    <NavbarButtonDiv>
      <div>
        <LeftButton onClick={() => clickSide("left")} active={highlights.left === type ? true : false}></LeftButton>
        <RightButton onClick={() => clickSide("right")} active={highlights.right === type ? true : false}></RightButton>
      </div>
      <p>{type}</p>
    </NavbarButtonDiv>
  )
}

export default NavbarButton;