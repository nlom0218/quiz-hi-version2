import { useQuery } from '@apollo/client';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
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

const DETATIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
    }
  }
`

const SelectQuiz = ({ setQuizId, quizId, setQuizTitle }) => {
  const { data, loading } = useQuery(DETATIL_QUIZ_QUERY, {
    variables: { id: parseInt(quizId) },
    skip: !quizId
  })
  return (<Container>
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faBook} /> 선택된 퀴즈</div>
      <div className="rightContent">{quizId ? data?.detailQuiz?.title : "선택된 퀴즈가 없습니다."}</div>
    </Wrapper>
    <SelectQuizList setQuizId={setQuizId} setQuizTitle={setQuizTitle} />
  </Container >);
}

export default SelectQuiz;