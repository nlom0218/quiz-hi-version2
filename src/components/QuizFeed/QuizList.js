import React from 'react';
import styled from 'styled-components';
import QuizItem from './QuizItem';

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

const SQuizList = styled.div`
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

const QuizList = ({ setPutQuiz, loading, seeQuiz }) => {
  const noData = () => {
    if (loading) {
      return false
    }
    if (!seeQuiz || seeQuiz.quiz.length === 0) {
      return true
    }
  }
  return (
    <React.Fragment>
      <Container>
        {loading ? <Loading>loading...</Loading> :
          <SQuizList>
            {
              seeQuiz?.quiz.map((item, index) => {
                return <QuizItem key={index} {...item} setPutQuiz={setPutQuiz} />
              })
            }
          </SQuizList>}
      </Container >
      { noData() && <NotFoundData>검색된 퀴즈가 없습니다.</NotFoundData>}
    </React.Fragment>);
}

export default QuizList;