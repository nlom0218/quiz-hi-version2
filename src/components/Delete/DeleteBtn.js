import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';

const SDeleteBtn = styled.div`
  animation: ${fadeIn} 0.3s linear;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  button {
    grid-column: 1 / 2;
    background-color: tomato;
    color: #f4f4f4;
    text-align: center;
    font-weight: 600;
    padding: 10px 0px;
    margin-top: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
`

const DELETE_QUIZ_MUTATION = gql`
  mutation deleteQuiz($id: Int!) {
    deleteQuiz(id: $id) {
      ok
      error
    }
  } 
`

const DELETE_QUESTION_MUTATION = gql`
  mutation deleteQuestion($id: Int!) {
    deleteQuestion(id: $id) {
      ok
      error
    }
  }
`

const DeleteBtn = () => {
  const { id, type } = useParams()
  const history = useHistory()
  const user = useUser()
  const onCompleted = (result) => {
    let ok = null
    let error = null
    if (type === "quiz") {
      ok = result.deleteQuiz
      error = result.deleteQuiz
    } else if (type === "question") {
      ok = result.deleteQuestion
      error = result.deleteQuestion
    }
    if (ok) {
      history.push(`/profile/${user.username}/quizQuestion/public/${type}/1`)
      window.location.reload()
    } else {
      window.alert("해당 퀴즈 / 문제의 삭제 권한이 없습니다.")
    }

  }
  const [deleteQuiz, { loading: deleteQuizLoading }] = useMutation(DELETE_QUIZ_MUTATION, {
    onCompleted
  })
  const [deleteQuestion, { loading: deleteQuestionLoading }] = useMutation(DELETE_QUESTION_MUTATION, {
    onCompleted
  })
  const onClickDelBtn = () => {
    if (type === "quiz") {
      if (deleteQuizLoading) {
        return
      }
      deleteQuiz({
        variables: { id: parseInt(id) }
      })
    }
    if (type === "question") {
      if (deleteQuestionLoading) {
        return
      }
      deleteQuestion({
        variables: { id: parseInt(id) }
      })
    }
  }
  return (<SDeleteBtn onClick={onClickDelBtn}>
    <button>{type === "quiz" ? "퀴즈" : "문제"} 영구 삭제하기</button>
  </SDeleteBtn>);
}

export default DeleteBtn;