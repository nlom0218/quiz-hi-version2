import React from 'react';
import styled from 'styled-components';

const SFormLayout = styled.div`
  background-color: ${props => props.theme.boxColor};
  padding: 30px 40px;
  border-radius: 5px;
  box-shadow: ${props => props.theme.boxShadow};
  border: 1px solid rgb(200, 200, 200, 0.8);
  position: relative;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  transition: background-color 1s ease;
  .loginCreateAccountForm {
    width: 100%;
    display: grid;
    row-gap: 30px;
  }
`

const FormLayout = ({ children, bgColor }) => {
  return (<SFormLayout>
    {children}
  </SFormLayout>);
}

export default FormLayout;