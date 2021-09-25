import React from 'react';

const ReadOnlyTextarea = styled.textarea`
  margin-top: ${props => props.tags ? "10px" : "20px"};
  grid-column: 1 / -1;
  grid-row: 5 / 6;
  line-height: 25px;
  width: 100%;
  height: ${props => props.txtHeight}px;
  resize: none;
  border: none;
  font-size: 16px;
  color: ${props => props.theme.fontColor};
  background-color: ${props => props.theme.bgColor};
  transition: box-shadow 0.4s linear;
  :focus {
    outline: none;
  }
`

export default ReadOnlyTextarea