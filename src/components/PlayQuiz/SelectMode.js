import { useQuery } from '@apollo/client';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import SelectQuizList from './SelectQuizList';

const Container = styled.div`
  display: grid;
  row-gap: 30px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 30px;
  row-gap: 20px;
  .leftContent {
    align-self: flex-start;
    background-color: rgb(255, 165, 0, 0.4);
    padding: 5px 10px;
    border-radius: 5px;
  }
  .rightContent {
    align-self: center;
    line-height: 20px;
  }
`

const SelectModeList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`

const Mode = styled.div`
  svg {
    font-size: 16px;
    cursor: pointer;
  }
`

const ExplainMode = styled.div`
  line-height: 20px;
`

const SelectMode = ({ quizMode, setQuizMode, setType, setStduents }) => {
  const onClickModeBtn = (mode) => {
    localStorage.setItem("selectMode", mode)
    setQuizMode(mode)
    setType(undefined)
    setStduents([])
  }
  const processQuizMode = () => {
    if (quizMode === "nomal") {
      return "일반"
    } else if (quizMode === "goldenBell") {
      return "골든벨"
    } else if (quizMode === "score") {
      return "포인트"
    } else if (quizMode === "cooperation") {
      return "협동"
    }
  }
  const processModeExplain = () => {
    if (quizMode === "nomal") {
      return "일반모드는 어떤한 설정 없이 퀴즈가 시작됩니다."
    } else if (quizMode === "goldenBell") {
      return "골든벨모드에서는 문제의 정답을 맞추지 못하면 탈락이 되며 탈락된 학생들은 패자부활전을 통해 다시 문제를 풀 수 있는 기회가 주어집니다. 아래의 단계에서 패자부활전 문제를 설정합니다.(개인별 활동에 유용합니다.)"
    } else if (quizMode === "score") {
      return "포인트모드에서는 각 문제마다 점수가 있으며 문제를 맞출 때 마다 점수를 획득합니다. 아래의 단계에서 각 문제마다 점수를 설정합니다.(개인별 또는 모둠 점수를 통한 활동에 유용합니다.)"
    } else if (quizMode === "cooperation") {
      return "협동모드에서는 포인트모드와 동일하게 각 문제에 점수가 있지만 최종적으로 모든 학생들이 얻은 점수들이 합산되어 결과가 나옵니다. 아래의 단계에서 각 문제마다 점수를 설정합니다.(합산 점수를 통한 단체 활동에 유용합니다.)"
    }
  }
  return (<Container>
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faGamepad} /> 선택된 모드</div>
      <div className="rightContent">{processQuizMode()}</div>
    </Wrapper>
    <SelectModeList>
      <Mode>
        <FontAwesomeIcon
          icon={quizMode === "nomal" ? faCheckCircle : faCircle}
          onClick={() => onClickModeBtn("nomal")} /> 일반
      </Mode>
      <Mode>
        <FontAwesomeIcon
          icon={quizMode === "goldenBell" ? faCheckCircle : faCircle}
          onClick={() => onClickModeBtn("goldenBell")} /> 골든벨
      </Mode>
      <Mode>
        <FontAwesomeIcon
          icon={quizMode === "score" ? faCheckCircle : faCircle}
          onClick={() => onClickModeBtn("score")} /> 포인트
      </Mode>
      <Mode>
        <FontAwesomeIcon
          icon={quizMode === "cooperation" ? faCheckCircle : faCircle}
          onClick={() => onClickModeBtn("cooperation")} /> 협동
      </Mode>
    </SelectModeList>
    {quizMode && <ExplainMode>
      {processModeExplain()}
    </ExplainMode>}
  </Container >);
}

export default SelectMode;