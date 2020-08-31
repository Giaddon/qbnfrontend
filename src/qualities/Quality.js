/** Displays a quality name and value. */

import React from 'react';
import styled from 'styled-components';

const QualityDiv = styled.div`
  flex: 0 1 92px;
  border-radius: 4px;
  border: 1px solid #000;
  padding: 5px;
`

function Quality({ name="Unidentified Quality", value=0 }) {
  return (
    <QualityDiv>
      <h3>{name}</h3>
      <p>{value}</p>
    </QualityDiv>
  );
}

export default Quality; 