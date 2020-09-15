import React from 'react';
import styled from 'styled-components';

import { selectInterface } from '../interface/interfaceSlice';
import { useSelector } from 'react-redux';
import QualityList from '../qualities/QualityList';
import Travel from './Travel';

const SidebarDiv = styled.div`
  flex: 0 1 250px;
  background-color: white;
  padding: 10px 10px 60px 10px;
  display: ${props => props.visible ? "block" : "none"};
`;

function Sidebar() {
  const interfaceState = useSelector(selectInterface);
  let displayedItem = null;

  if (interfaceState.sidebarDisplay === 'qualities') displayedItem = <QualityList />
  else if (interfaceState.sidebarDisplay === 'travel') displayedItem = <Travel />


  return (
    <SidebarDiv visible={interfaceState.sidebar}>
      {displayedItem}
    </SidebarDiv>
  )
}

export default Sidebar;