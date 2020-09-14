import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectDomain } from './domainSlice';
import Outcome from './Outcome';
import { informative } from '../style/colors';

const OutcomesListDiv = styled.div`
  max-width: 700px; 
  padding: 10px;
  background-color: ${informative};
  color: white;
  margin: 10px auto 10px auto;
  border-radius: 2px;
`;

function OutcomesList() {
  const domain = useSelector(selectDomain);
  
  if(domain.activeReport?.outcomes?.length > 0) {

    return (
      <OutcomesListDiv>
        {domain.activeReport.outcomes.map(
          outcome => <Outcome key={outcome} text={outcome} />
        )}
      </OutcomesListDiv>
    )
  } else return null;

}


export default OutcomesList;