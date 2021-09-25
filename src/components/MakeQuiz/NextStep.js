import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const Warpper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  margin-top: 10px;
  animation: ${fadeIn} 0.4s linear forwards;
`

const NextBtn = styled.div`
  text-align: center;
  background-color: ${props => props.theme.blueColor};
  color: ${props => props.theme.bgColor};
  padding: 10px 0px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 1s ease, color 1s ease;
`

const Msg = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: tomato;
  padding: 10px 0px;
`

const NextStep = ({ setNextMode }) => {
  const [msg, setMsg] = useState(false)
  const onClickNextBtn = (mode) => {
    setNextMode(mode)
    setMsg(true)
  }
  return (<Warpper>
    {!msg ?
      <React.Fragment>
        <NextBtn onClick={() => onClickNextBtn("newQuestion")}>
          새로운 문제 만들기
        </NextBtn>
        <NextBtn onClick={() => onClickNextBtn("nextStep")}>
          3단계 진행하기
        </NextBtn>
      </React.Fragment>
      :
      <Msg>문제 수정은 퀴즈 완성 후 프로필 ‣ 퀴즈 & 문제에서 가능합니다.</Msg>
    }
  </Warpper>);
}

export default NextStep;