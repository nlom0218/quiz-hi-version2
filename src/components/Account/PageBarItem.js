import React from 'react';
import styled from 'styled-components';

const BarItem = styled.div`
  :nth-child(1) {
    margin-top: 20px;
  }
  margin-bottom: 20px;
  cursor: pointer;
`

const PageBarItem = ({ children }) => {
  return (<BarItem>
    {children}
  </BarItem>);
}

export default PageBarItem;