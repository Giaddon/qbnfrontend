import React from 'react';
import styled from 'styled-components';

import QualityList from './QualityList';

const QualityPageDiv = styled.div`
  background-color: inherit;
  padding: 20px 20px 100px 20px;
  width: 800px;
  min-height: 400px;
`

function QualityPage() {

  return (
    <QualityPageDiv>
      <QualityList />
    </QualityPageDiv>
  )
}

export default QualityPage;