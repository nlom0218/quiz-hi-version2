import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const SOptionTitle = styled.div`
  grid-column: 1 / -1;
  font-size: 16px;
  cursor: pointer;
  svg {
    margin-left: 10px;
    font-size: 20px;
  }
`

const QuestionOptionTitle = ({ option, setOption }) => {
  const onClickOption = () => {
    setOption(!option)
  }
  return (<SOptionTitle onClick={onClickOption}>
    <span>옵션</span>
    <FontAwesomeIcon icon={option ? faCaretUp : faCaretDown} />
  </SOptionTitle>);
}

export default QuestionOptionTitle;