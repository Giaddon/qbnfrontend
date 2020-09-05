import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectDomain } from './domainSlice';
import Outcome from './Outcome';
import { green } from '../typography/colors';

const OutcomesListDiv = styled.div`
  flex: 0 1 auto;
  padding: 10px;
  background-color: ${green};
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
`;

function OutcomesList() {
  const domain = useSelector(selectDomain);
  
  return (
    <OutcomesListDiv>
      {domain.activeReport.outcomes.map(
        outcome => <Outcome key={outcome} text={outcome} />
      )}
    </OutcomesListDiv>
  )
}


export default OutcomesList;