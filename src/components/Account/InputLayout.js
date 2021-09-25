import React from 'react';
import styled from 'styled-components';

const SInputLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  svg {
    margin-left: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  input {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: rgb(200, 200, 200, 0.2);
    transition: background-color 1s ease, box-shadow 0.4s linear;
    :focus {
      box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    }
  }
`

const InputLayout = ({ children, bgColor }) => {
  return (<SInputLayout>
    {children}
  </SInputLayout>);
}

export default InputLayout;