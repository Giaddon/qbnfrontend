import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Title, Text } from '../typography/typography';

const DomainDiv = styled.div`
  padding: 15px;
  width:100%;
  min-height: 100px;
  border: 1px solid #000;
  background-color: inherit;
  p:nth-child(2) {
    margin-top:10px;
  }
`

function Domain({ title, description, stories }) {

  return (
    <DomainDiv>
      <Title>{title}</Title>
      <Text>{description}</Text>
    </DomainDiv>
  )
}

export default connect(mapStateToProps)(Domain);

function mapStateToProps(state) {
  const { title, description, stories } = state.domain;
  return { 
    title,
    description,
    stories,
  }
}