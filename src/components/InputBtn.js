import React from 'react';
import styled from 'styled-components';

const SInputBtn = styled.input`
  background-color: ${props => props.theme.blueColor};
  color: ${props => props.theme.bgColor};
  opacity: ${props => props.disabled ? 0.4 : 1};
  text-align: center;
  font-weight: 600;
  padding: 10px 0px;
  border-radius: 5px;
  transition: opacity 0.6s linear, background-color 1s ease, color 1s ease;
  cursor: pointer;
`

const InputBtn = ({ disabled, value, bgColor }) => {
  return (
    <SInputBtn type="submit" value={value} disabled={disabled} bgColor={bgColor} />
  );
}

export default InputBtn;