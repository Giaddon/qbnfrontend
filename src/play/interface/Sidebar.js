import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectInterface } from '../../redux/interfaceSlice';
import QualityList from '../../qualities/QualityList';
import Travel from './Travel';

const SidebarDiv = styled.div`
  flex: 0 1 275px;
  background-color: white;
  padding: 0px 0px 60px 0px;
  display: ${props => props.visible ? "block" : "none"};
`;

function Sidebar() {
  const interfaceState = useSelector(selectInterface);
  let displayedItem = null;

  if (interfaceState.sidebarDisplay === 'qualities') displayedItem = <QualityList sidebar={true} />
  else if (interfaceState.sidebarDisplay === 'travel') displayedItem = <Travel />


  return (
    <SidebarDiv visible={interfaceState.sidebar}>
      {displayedItem}
    </SidebarDiv>
  )
}

export default Sidebar;