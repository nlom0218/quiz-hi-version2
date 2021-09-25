import React from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 20px;
  color: ${props => props.theme.fontColor};
  background-color: rgb(200, 200, 200, 0.2);
  transition: box-shadow 0.4s linear;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    outline: none;
  }
`

const QuestionTextarea = ({ register, nextMode }) => {
  return (<Textarea
    cols={20}
    rows={5}
    {...register("question", {
      required: true
    })}
    readOnly={nextMode !== "" && "readOnly"}
  ></Textarea >);
}

export default QuestionTextarea;