import React from 'react';
import styled from 'styled-components';
import QuestionItem from './QuestionItem';

const Container = styled.div`
  grid-column: 1 / 2;
  align-self: flex-start;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const Loading = styled.div`
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
`

const SQuestionList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`

const NotFoundData = styled.div`
  grid-column: 1 / 2;
  /* margin-top: 20px; */
  color: tomato;
`

const QuestionList = ({ seeQuestion, loading, setPutQuiz }) => {
  const noData = () => {
    if (loading) {
      return false
    }
    if (!seeQuestion || seeQuestion.question.length === 0) {
      return true
    }
  }
  return (
    <React.Fragment>
      <Container>
        {loading ? <Loading>loading...</Loading> : <SQuestionList>
          {seeQuestion?.question?.map((item, index) => {
            return <QuestionItem key={index} {...item} setPutQuiz={setPutQuiz} />
          })}
        </SQuestionList>}
      </Container>
      {noData() && <NotFoundData>검색된 문제가 없습니다.</NotFoundData>}
    </React.Fragment>);
}

export default QuestionList;