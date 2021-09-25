import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const SInputLayout = styled.div`
  display: grid;
  grid-template-columns: ${props => props.updateQuestion ? "100px" : "180px"} 1fr;
  align-items: flex-start;
  position: relative;
  .inputTitle {
    svg {
      cursor: pointer;
    }
  }
  .subMsg {
    z-index: 1;
    line-height: 20px;
    position: absolute;
    top: 25px;
    left: 10px;
    /* opacity: 0.8; */
    background-color: ${props => props.theme.fontColor};
    color: ${props => props.theme.bgColor};
    padding: 10px 20px;
    border-radius: 10px;
    border-top-left-radius: 0px;
    transition: background-color 1s ease, color 1s ease;
    animation: ${fadeIn} 0.6s ease;
  }
  input {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: rgb(200, 200, 200, 0.2);
    transition: box-shadow 0.4s linear;
    :focus {
      box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    }
  }
`

const InputLayout = ({ children, updateQuestion }) => {
  return (<SInputLayout updateQuestion={updateQuestion}>
    {children}
  </SInputLayout>);
}

export default InputLayout;