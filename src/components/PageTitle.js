import React from 'react';
import styled from 'styled-components';

const SPageTitle = styled.div`
  grid-column: 2 / 7;
  font-size: 18px;
  align-self: center;
  letter-spacing: 5px;
  font-weight: 600;
`

const PageTitle = ({ children }) => {
  return (<SPageTitle>{children}</SPageTitle>);
}

export default PageTitle;