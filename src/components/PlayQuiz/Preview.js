import { gql, useQuery } from '@apollo/client';
import { faBook, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { compare } from '../../sharedFn';
import PreviewList from './PreviewList';
import UnityScore from './UnityScore';

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

const ConsolationQuestion = styled.div`
  justify-self: center;
  color: tomato;
  display: grid;
  row-gap: 20px;
  justify-items: center;
`

const DETATIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
      order
      questions {
        id
        type
        question
        answer
        distractor
        hint
        image
        user {
          nickname
        }
      }
    }
  }
`

const Preview = ({ quizMode, quizId, quizList, setQuizList, setChange, students }) => {
  const onCompleted = () => {
    const orderArr = JSON.parse(data.detailQuiz.order)
    const quizList = data.detailQuiz.questions.map((item, index) => {
      return {
        id: item.id,
        order: (orderArr ?
          orderArr.findIndex(id => id === item.id) + 1
          :
          index + 1),
        type: item.type,
        question: item.question,
        answer: item.answer,
        distractor: item.distractor,
        hint: item.hint,
        image: item.image,
        author: item.user.nickname
      }
    }).sort(compare("order"))
    localStorage.setItem("quizList", JSON.stringify(quizList))
    setQuizList(quizList)
  }
  const { data, loading } = useQuery(DETATIL_QUIZ_QUERY, {
    variables: { id: parseInt(quizId) },
    skip: !quizId,
    onCompleted
  })
  const processQuizMode = () => {
    if (!quizList) {
      return
    }
    if (quizMode === "nomal") {
      return "일반모드를 선택하였습니다."
    } else if (quizMode === "goldenBell") {
      return "골든벨모드를 선택하였습니다. 패자부활전 문제를 선택해주세요."
    } else if (quizMode === "score") {
      return "포인트모드를 선택하였습니다. 문제에 점수를 설정해주세요."
    } else if (quizMode === "cooperation") {
      return "협동모드를 선택하였습니다. 문제에 점수를 설정해주세요."
    } else {
      return "모드를 선택해주세요."
    }
  }
  const processConsolationQuestion = () => {
    if (!quizList) {
      return
    }
    const consolationQuestion = quizList.filter((item) => item.consolation)
    if (consolationQuestion.length !== 0) {
      return `${consolationQuestion.map((item) => `${item.order}번`).join(", ")} 문제를 패자부활전 문제로 선택하였습니다.`
    } else {
      return "선택된 패자부활전 문제가 없습니다."
    }
  }
  const processScoreQuestion = () => {
    if (!quizList) {
      return
    }
    const scoreArr = quizList.map((item) => item.score)
    if (scoreArr.includes(undefined)) {
      return "모든 문제에 점수 설정이 완료되지 않았습니다."
    } else {
      const totalScore = scoreArr.reduce((acc, cur) => acc + cur)
      return `점수 설정이 완료되었습니다. 개인이 얻을 수 있는 최고점은 ${totalScore}점입니다.`
    }
  }
  const processCooperationQuestion = () => {
    if (!quizList) {
      return
    }
    if (students.length === 0) {
      return `학생들을 선택하면 총점이 계산됩니다.`
    }
    const scoreArr = quizList.map((item) => item.score)
    if (scoreArr.includes(undefined)) {
      return
    } else {
      const totalScore = scoreArr.reduce((acc, cur) => acc + cur) * students.length
      return `목표 점수의 최고점은 ${totalScore}점입니다.`
    }
  }
  const unityScore = () => {
    if (!quizList) {
      return
    }
    if (quizMode === "score") {
      return true
    } else if (quizMode === "cooperation") {
      return true
    } else {
      return false
    }
  }
  return (<Container>
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faBook} /> 선택된 퀴즈</div>
      <div className="rightContent">{quizId ? data?.detailQuiz?.title : "선택된 퀴즈가 없습니다."}</div>
    </Wrapper>
    <Wrapper>
      <div className="rightContent">{processQuizMode()}</div>
    </Wrapper>
    {unityScore() && <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faCog} /> 같은 점수로 설정</div>
      <div className="rightContent"><UnityScore quizList={quizList} setQuizList={setQuizList} setChange={setChange} /></div>
    </Wrapper>}
    {quizList && <PreviewList quizList={quizList} quizMode={quizMode} setQuizList={setQuizList} setChange={setChange} />}
    {quizMode === "goldenBell" && <ConsolationQuestion>{processConsolationQuestion()}</ConsolationQuestion>}
    {quizMode === "score" && <ConsolationQuestion>{processScoreQuestion()}</ConsolationQuestion>}
    {quizMode === "cooperation" && <ConsolationQuestion>
      <div>{processScoreQuestion()}</div>
      <div>{processCooperationQuestion()}</div>
    </ConsolationQuestion>}
  </Container >);
}

export default Preview;