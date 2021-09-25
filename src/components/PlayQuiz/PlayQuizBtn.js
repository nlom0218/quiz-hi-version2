import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';

const SPlayQuizBtn = styled.div`
  text-align: center;
  background-color: rgb(255, 165, 0, 0.4);
  padding: 10px;
  border-radius: 5px;
  opacity: ${props => props.able ? "1" : "0.6"};
  cursor: ${props => props.able ? "pointer" : "not-allowed"};
  transition: opacity 0.6s ease;
`

const CREATE_HOMEWORK_MUTATION = gql`
  mutation createHomework($quizId: Int!, $studentId: String!, $score: String!, $mode: String!, $targetScore: Int) {
    createHomework(quizId: $quizId, studentId: $studentId, score: $score, mode: $mode, targetScore: $targetScore) {
      ok
      error
    }
  }
`

const PlayQuizBtn = ({ quizList, quizId, quizMode, type, targetScore, students, setStartQuiz, setErrMsg }) => {
  const onCompleted = (result) => {
    const { createHomework: { ok, error } } = result
    if (ok) {
      window.alert("선택된 학생들에게 퀴즈가 보내졌습니다. 숙제관리는 프로필 > 학생 관리에서 할 수 있습니다.")
      localStorage.removeItem("selectQuiz")
      localStorage.removeItem("selectQuizTitle")
      localStorage.removeItem("selectMode")
      localStorage.removeItem("quizList")
      localStorage.removeItem("targetScore")
      window.location.reload()
    } else {
      setErrMsg(error)
    }
  }
  const [createHomework, { loading }] = useMutation(CREATE_HOMEWORK_MUTATION, {
    onCompleted
  })
  const ablePalyQuiz = () => {
    if (!quizList) {
      return false
    }
    if (!quizId && !quizList && !quizMode) {
      return false
    }
    if (quizMode === "nomal") {
      return true
    }
    if (quizMode === "goldenBell" && quizList.filter((item) => item.consolation).length === 0) {
      return false
    }
    if (quizMode === "score" && quizList.map((item) => item.score).includes(undefined)) {
      return false
    }
    if (quizMode === "cooperation" && quizList.map((item) => item.score).includes(undefined)) {
      return false
    }
    if (quizMode === "cooperation" && !targetScore) {
      return false
    }
    if (type !== "nomal" && students.length === 0) {
      return false
    }
    return true
  }
  const onClickPalyQuiz = () => {
    if (!ablePalyQuiz()) {
      return
    }
    if (type === "send") {
      if (loading) {
        return
      }
      const studentId = students.map((item) => item.id).join(",")
      const score = quizList.map((item) => { return { id: parseInt(item.id), score: parseInt(item.score) } })
      createHomework({
        variables: {
          quizId: parseInt(quizId),
          studentId,
          score: JSON.stringify(score),
          mode: quizMode,
          ...(targetScore && { targetScore: parseInt(targetScore) })
        }
      })
    } else {
      localStorage.setItem("joinStudent", JSON.stringify(students))
      localStorage.setItem("startQuiz", true)
      localStorage.setItem("targetScore", targetScore)
      setStartQuiz(true)
    }
  }
  return (<SPlayQuizBtn able={ablePalyQuiz()} onClick={onClickPalyQuiz}>
    {type === "send" ? (loading ? "보내는 중..." : "퀴즈 내보내기") : "퀴즈 진행하기"}
  </SPlayQuizBtn>);
}

export default PlayQuizBtn;