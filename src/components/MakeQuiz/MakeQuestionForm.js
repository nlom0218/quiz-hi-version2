import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const SMakeQuestionForm = styled.form`
  animation: ${fadeIn} 0.6s ease forwards;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 60px;
`

const MakeQuestionForm = ({ children, onSubmit }) => {
  return (<SMakeQuestionForm onSubmit={onSubmit}>
    {children}
  </SMakeQuestionForm>);
}

export default MakeQuestionForm;