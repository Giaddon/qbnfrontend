import React from 'react';
import styled from 'styled-components';

import { SidebarText } from '../typography/typography';

const OutcomeDiv = styled.div`
  &~& {
    margin-top: 6px;
  }
`;

function Outcome({ text }) {
  return (
    <OutcomeDiv>
      <SidebarText>{text}</SidebarText>
    </OutcomeDiv>
  )
}

export default Outcome;