import { faPlay, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import PageTitle from '../components/PageTitle';
import CallSendQuiz from '../components/PlayQuiz/CallSendQuiz';
import CompleteSetting from '../components/PlayQuiz/CompleteSetting';
import PlayQuizLayout from '../components/PlayQuiz/PlayQuizLayout';
import Preview from '../components/PlayQuiz/Preview';
import SelectMode from '../components/PlayQuiz/SelectMode';
import SelectQuiz from '../components/PlayQuiz/SelectQuiz';
import StartQuiz from '../components/PlayQuiz/StartQuiz/StartQuiz';
import useTitle from '../hooks/useTitle';

const ResetBtn = styled.div`
  grid-column: 7 / 12;
  justify-self: flex-end;
  background-color: rgb(255, 165, 0, 0.4);
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(255, 165, 0, 0.8);
  }
  svg {
    margin-right: 10px;
  }
`

const OptionBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const OptionTitle = styled.div`
`

const OptionContent = styled.div`
`

const PlayQuiz = () => {
  const titleUpdataer = useTitle("QUIZ HI | 퀴즈 진행")
  const [change, setChange] = useState(true)
  const [startQuiz, setStartQuiz] = useState(localStorage.getItem("startQuiz") || false)
  const [quizId, setQuizId] = useState(localStorage.getItem("selectQuiz") || null)
  const [quizTitle, setQuizTitle] = useState(localStorage.getItem("selectQuizTitle") || null)
  const [quizMode, setQuizMode] = useState(localStorage.getItem("selectMode") || null)
  const [quizList, setQuizList] = useState(JSON.parse(localStorage.getItem("quizList")) || null)
  const [students, setStduents] = useState([])
  const [targetScore, setTargetScore] = useState(undefined)
  const [type, setType] = useState(undefined)
  const onClickResetBtn = () => {
    localStorage.removeItem("selectQuiz")
    setQuizId(null)
    localStorage.removeItem("selectQuizTitle")
    setQuizTitle(null)
    localStorage.removeItem("selectMode")
    setQuizMode(null)
    localStorage.removeItem("quizList")
    setQuizList(null)
    setStduents([])
    setType(undefined)
    localStorage.removeItem("targetScore")
  }
  const questionSetting = () => {
    if (!quizMode) {
      return false
    }
    if (quizMode === "nomal") {
      return false
    }
    return true
  }
  return (
    <React.Fragment>
      {startQuiz ?
        <BasicContainer><StartQuiz /></BasicContainer>
        :
        <React.Fragment>
          <Header />
          <BasicContainer>
            <PageTitle><FontAwesomeIcon icon={faPlay} /> 퀴즈 진행하기</PageTitle>
            <ResetBtn onClick={onClickResetBtn} ><FontAwesomeIcon icon={faRedoAlt} />초기화</ResetBtn>
            <PlayQuizLayout>
              <OptionBox>
                <OptionTitle>퀴즈 선택하기</OptionTitle>
                <OptionContent><SelectQuiz quizId={quizId} setQuizId={setQuizId} setQuizTitle={setQuizTitle} /></OptionContent>
              </OptionBox>
              <OptionBox>
                <OptionTitle>모드 선택하기</OptionTitle>
                <OptionContent><SelectMode quizMode={quizMode} setQuizMode={setQuizMode} setType={setType} setStduents={setStduents} /></OptionContent>
              </OptionBox>
              <OptionBox>
                <OptionTitle>문제, 정답 미리보기</OptionTitle>
                <OptionContent><Preview quizMode={quizMode} quizId={quizId} quizList={quizList} setQuizList={setQuizList} setChange={setChange} students={students} /></OptionContent>
              </OptionBox>
              {questionSetting() && <OptionBox>
                <OptionTitle>진행하기 / 내보내기</OptionTitle>
                <OptionContent><CallSendQuiz students={students} setStduents={setStduents} type={type} setType={setType} quizMode={quizMode} quizList={quizList} targetScore={targetScore} setTargetScore={setTargetScore} /></OptionContent>
              </OptionBox>}
              <OptionBox>
                <OptionTitle>퀴즈 진행하기</OptionTitle>
                <OptionContent><CompleteSetting quizId={quizId} quizMode={quizMode} students={students} type={type} quizList={quizList} setStartQuiz={setStartQuiz} targetScore={targetScore} /></OptionContent>
              </OptionBox>
            </PlayQuizLayout>
          </BasicContainer>
          <NavBtn />
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default PlayQuiz;