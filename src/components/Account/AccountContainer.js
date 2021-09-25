import React from 'react';
import styled from 'styled-components';
import { AccountContainerGsap } from '../../hooks/Gsap';

const SAccountContainer = styled.div`
  height: 100vh;
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 400px 400px 100px 300px;
  grid-template-rows: 1fr auto 1fr;
  align-content: flex-start;
`

const AccountContainer = ({ children }) => {
  return (<SAccountContainer className="accountContainer">
    <AccountContainerGsap container="accountContainer" />
    {children}
  </SAccountContainer>);
}

export default AccountContainer;