import { useQuery, useReactiveVar } from '@apollo/client';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoneSchemaDefinitionRule } from 'graphql';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import { setHomeworkQuizId } from '../../../apollo';
import useUser from '../../../hooks/useUser';
import { getCreatedDay } from "../../../sharedFn"
import HomeworkInfo from './HomeworkInfo';

const SHomeworkItem = styled.div`
  display: grid;
  grid-template-columns: 140px 360px 80px 1fr;
  row-gap: 10px;
  padding: 15px 20px;
  align-items: center;
  line-height: 20px;
  :nth-child(odd) {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const Date = styled.div``

const Title = styled.div`
  padding-right: 20px;
`

const Mode = styled.div``

const FinishBtn = styled.div`
  justify-self: flex-end;
  background-color: ${props => props.finish ? "tomato" : props.theme.blueColor};
  color: ${props => props.type === "teacher" ? "#F4F4F4" : props.theme.bgColor};
  padding: 5px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 1s ease, color 1s ease;
`

const ResultBtn = styled.div`
  justify-self: flex-end;
  text-decoration: underline;
  cursor: pointer;
`

const InfoBtn = styled.div`
  justify-self: flex-end;
  cursor: pointer;
  svg {
    margin-right: 10px;
  }
`

const SEE_HOMEWORKRESULT_QUERY = gql`
  query seeHomeworkResult($userId: Int!, $quizId: Int!) {
    seeHomeworkResult(userId: $userId, quizId: $quizId) {
      id
      result
      score
    }
  }
`


const HomeworkItem = ({ createdAt, title, mode, quizId, score, order, setComplete, user: student, targetScore, id, finish, teacherId, profileUserId, userType }) => {
  const [seeInfo, setSeeInfo] = useState(false)
  const user = useUser()
  const { data, loading } = useQuery(SEE_HOMEWORKRESULT_QUERY, {
    variables: {
      userId: profileUserId,
      quizId
    }
  })
  const processMode = (mode) => {
    if (mode === "score") {
      return "포인트"
    } else if (mode === "cooperation") {
      return "협동"
    }
  }
  const onClickSolveBtn = (quizId) => {
    if (processSolveBtn() === "미제출") {
      return
    }
    if (userType === "teacher") {
      return
    }
    if (finish) {
      window.alert("종료된 퀴즈 입니다.")
      return
    }
    if (quizId === parseInt(localStorage.getItem("homeworkQuizId"))) {
      return
    }
    localStorage.setItem("homeworkScore", score)
    localStorage.setItem("homeworkOrder", order)
    localStorage.setItem("homeworkQuizId", quizId)
    localStorage.setItem("teacherId", teacherId)
    localStorage.setItem("homeworkId", id)
    localStorage.removeItem("homeworkResult")
    setHomeworkQuizId(quizId)
    setComplete(false)
  }
  const onClickResultBtn = (quizId) => {
    if (quizId === parseInt(localStorage.getItem("homeworkQuizId"))) {
      return
    }
    if (loading) {
      return
    }
    if (userType === "teacher") {
      return
    }
    const { seeHomeworkResult: { result, score } } = data
    localStorage.setItem("homeworkResult", result)
    localStorage.setItem("homeworkScore", score)
    localStorage.setItem("homeworkQuizId", quizId)
    setHomeworkQuizId(quizId)
    setComplete(false)
  }
  const totalScore = () => {
    return JSON.parse(score).map((item) => parseInt(item.score)).reduce((acc, cur) => acc + cur, 0)
  }
  const onClickInfoBtn = () => {
    setSeeInfo(prev => !prev)
  }
  const processSolveBtn = () => {
    if (profileUserId === user.id) {
      return "풀기"
    } else {
      return "미제출"
    }
  }
  return (<SHomeworkItem>
    <Date>{getCreatedDay(createdAt)}</Date>
    <Title>{title}</Title>
    <Mode>{processMode(mode)}</Mode>
    {userType === "teacher" ?
      <InfoBtn onClick={onClickInfoBtn}><FontAwesomeIcon icon={faInfoCircle} /></InfoBtn>
      :
      (!data?.seeHomeworkResult ?
        <FinishBtn
          finish={finish}
          onClick={() => onClickSolveBtn(quizId)} >
          {finish ? "종료됨" : processSolveBtn()}
        </FinishBtn>
        :
        <ResultBtn onClick={() => onClickResultBtn(quizId)} >
          {data?.seeHomeworkResult?.score}점/{totalScore()}점
        </ResultBtn>
      )
    }
    {seeInfo &&
      <HomeworkInfo student={student} score={score} targetScore={targetScore} order={order} homeworkId={id} finish={finish} teacherId={teacherId} />
    }
  </SHomeworkItem>);
}

export default HomeworkItem;