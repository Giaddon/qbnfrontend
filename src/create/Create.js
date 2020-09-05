import React from 'react';
import styled from 'styled-components';

const CreateDiv = styled.div`
margin: 0 auto;
text-align: center;
color: white;
`

const CreateTitle = styled.p`
  font-family: 'Alata', sans-serif;
  font-size: 10em;
  letter-spacing: 0.1em;
`

function Create() {
  return (
    <CreateDiv>
      <CreateTitle>CREATE</CreateTitle>
    </CreateDiv>
  )
}

export default Create;