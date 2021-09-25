import React from 'react';
import styled from 'styled-components';
import EditInputLayout from './EditInputLayout';

const InputTitle = styled.div`
`

const SeletBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
`

const TFBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(200, 200, 200, 0.6);
    opacity: ${props => props.selected ? 1 : 0.4};
    font-size: 20px;
    padding: 10px 0px;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity 0.2s linear;
`

const EidtTfQuestionAnswer = ({ tfAnswer, setTfAnswer }) => {
  const onClickTFBtn = (answer) => {
    setTfAnswer(answer)
  }
  return (<EditInputLayout>
    <InputTitle>정답 수정하기</InputTitle>
    <SeletBox>
      <TFBtn
        onClick={() => onClickTFBtn("true")}
        selected={tfAnswer === "true"}
      >○</TFBtn>
      <TFBtn
        onClick={() => onClickTFBtn("false")}
        selected={tfAnswer === "false"}
      >✕</TFBtn>
    </SeletBox>
  </EditInputLayout>);
}

export default EidtTfQuestionAnswer;