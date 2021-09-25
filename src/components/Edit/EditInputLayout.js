import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  .firstInput {
    background-color: rgb(200, 200, 200, 0.2);
  }
  input {
    padding: 10px 20px;
    border-radius: 5px;
    transition: box-shadow 0.4s linear;
    :not(:last-child) {
      background-color: rgb(200, 200, 200, 0.2);
    }
    :focus {
      box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    }
  }
  textarea {
    width: 100%;
    resize: none;
    border: none;
    font-size: 16px;
    border-radius: 5px;
    padding: 10px 20px;
    color: ${props => props.theme.fontColor};
    background-color: rgb(200, 200, 200, 0.2);
    transition: box-shadow 0.4s linear, color 1s ease;
    :focus {
      box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
      outline: none;
    }
  }
`

const EditInputLayout = ({ children }) => {
  return (<Wrapper>
    {children}
  </Wrapper>);
}

export default EditInputLayout;