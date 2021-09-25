import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { compare, compareDesc } from '../../sharedFn';
import { ContentNum, DetailInfoLayout, Title } from './sharedCss';

const ScoreContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`

const ScoreList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 1px solid rgb(200, 200, 200, 0.6);
  line-height: 20px;
`

const ScoreItem = styled.div`
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1fr 100px;
  column-gap: 20px;
  :nth-child(odd) {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const QuizNum = styled.div``

const QuizTitle = styled.div``

const QuizScore = styled.div`
  justify-self: flex-end;
`


const StudentScoreList = ({ quizScore }) => {
  const quizScoreArr = JSON.parse(quizScore).sort(compareDesc("num")).filter((item) => item.num !== 0)
  return (<DetailInfoLayout>
    <Title>
      <div><FontAwesomeIcon icon={faBook} /> 퀴즈 점수</div>
      <ContentNum>{quizScoreArr.length}개의 퀴즈에 참여</ContentNum>
    </Title>
    <ScoreContainer>
      {quizScoreArr.length !== 0 ?
        <ScoreList>
          {quizScoreArr.map((item, index) => {
            return <ScoreItem key={index}>
              <QuizTitle>{item.quizTitle}</QuizTitle>
              <QuizScore>{item.score}점</QuizScore>
            </ScoreItem>
          })}
        </ScoreList>
        :
        <div style={{ marginTop: "20px" }}>참여한 퀴즈가 없습니다.</div>
      }
    </ScoreContainer>
  </DetailInfoLayout>);
}

export default StudentScoreList;