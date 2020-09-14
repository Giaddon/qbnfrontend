import React from 'react';
import styled from 'styled-components';

import { selectInterface } from '../interface/interfaceSlice';
import { useSelector } from 'react-redux';
import QualityList from '../qualities/QualityList';

const SidebarDiv = styled.div`
  flex: 0 1 250px;
  background-color: white;
  padding: 10px 10px 60px 10px;
  display: ${props => props.visible ? "block" : "none"};
`;

function Sidebar() {
  const interfaceState = useSelector(selectInterface);
  return (
    <SidebarDiv visible={interfaceState.sidebar}>
      <QualityList />
    </SidebarDiv>
  )
}

export default Sidebar;