import React from 'react';
import styled from 'styled-components';

const SPageBar = styled.div`  
  grid-column: 3 / span 1;
  grid-row: 2 / 3;
  align-self: flex-start;
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 0px 10px;
`

const PageBar = ({ children, borderColor, hoverBgColor }) => {
  return (<SPageBar borderColor={borderColor} hoverBgColor={hoverBgColor}>
    {children}
  </SPageBar>);
}

export default PageBar;