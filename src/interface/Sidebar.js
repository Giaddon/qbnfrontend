import React from 'react';
import styled from 'styled-components';

import { selectInterface } from '../interface/interfaceSlice';
import { useSelector } from 'react-redux';
import QualityList from '../qualities/QualityList';

const SidebarDiv = styled.div`
  flex: 0 1 40%;
  background-color: inherit;
  padding: 10px;
  display: ${props => props.visible ? "block" : "none"};
  border-right: 1px solid #000;
  margin-right: 5px;
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