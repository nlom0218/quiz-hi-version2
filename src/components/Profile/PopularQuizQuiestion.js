import { useMutation, useQuery } from '@apollo/client';
import { faBook, faBookOpen, faFire, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PopularQuestionItem from './PopularQuestionItem';
import PopularQuizItem from './PopularQuizItem';

const DetailInfoLayout = styled.div`
  padding: 20px;
  border: 1px solid rgb(200, 200, 200, 0.6);
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const Title = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(200, 200, 200, 0.6);
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`

const PopularContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  margin-top: 20px;
`

const EmtpyMsg = styled.div`
  margin-top: 20px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 10px;
  align-items: flex-start;
`

const SubTitle = styled.div`

`

const ContentList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  border: 1px solid rgb(200, 200, 200, 0.8);
  padding: 10px 20px;
`

const SEE_POPULAR_QUIZ = gql`
  query seePopularQuiz($userId: Int!) {
    seePopularQuiz(userId: $userId) {
      id
      title
      likes
      hits
    }
  }
`

const SEE_POPULAR_QUESTION = gql`
  query seePopularQuestion($userId: Int!) {
    seePopularQuestion(userId: $userId) {
      id
      question
      likes
      hits
    }
  }
`

const PopularQuizQuiestion = ({ userId, totalPublicQuiz, totalPublicQuestion }) => {
  const processPopular = () => {
    if (totalPublicQuiz === 0 && totalPublicQuestion === 0) {
      return false
    } else {
      return true
    }
  }
  const { data: quizData, loading: quizLoading } = useQuery(SEE_POPULAR_QUIZ, { variables: { userId } })
  const { data: questionData, loading: questionLoading } = useQuery(SEE_POPULAR_QUESTION, { variables: { userId } })
  return (<DetailInfoLayout>
    <Title><div><FontAwesomeIcon icon={faFire} /> 인기 퀴즈 & 문제</div></Title>
    {processPopular() ? <PopularContainer>
      <Wrapper>
        <SubTitle><FontAwesomeIcon icon={faBook} /> TOP3 퀴즈</SubTitle>
        {!quizLoading && <ContentList>
          {quizData.seePopularQuiz.map((item, index) => {
            return <PopularQuizItem key={index} {...item} index={index} />

          })}
        </ContentList>}
      </Wrapper>
      <Wrapper>
        <SubTitle><FontAwesomeIcon icon={faBookOpen} /> TOP3 문제</SubTitle>
        {!questionLoading && <ContentList>
          {questionData.seePopularQuestion.map((item, index) => {
            return <PopularQuestionItem key={index} {...item} index={index} />
          })}
        </ContentList>}
      </Wrapper>
    </PopularContainer> :
      <EmtpyMsg>생성된 퀴즈, 문제가 없습니다.</EmtpyMsg>
    }
  </DetailInfoLayout>);

}

export default PopularQuizQuiestion;