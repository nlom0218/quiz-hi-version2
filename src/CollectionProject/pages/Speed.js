import React from 'react';
import styled from 'styled-components';
import { mobileMoveBot, mobileMoveTop, tabletMoveBot, tabletMoveTop } from '../../animation/fade';
import { speedQuizList } from '../../Quiz/SpeedQuiz/SpeedQuizList';
import { customMedia } from '../../styles';

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  animation: ${props => props.moveBot ? mobileMoveBot : mobileMoveTop} 1s ease forwards;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
    animation: ${props => props.moveBot ? tabletMoveBot : tabletMoveTop} 1s ease forwards;
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr 1fr;
    animation: none;
  `}
`

const QuizList = styled.div`
  width: 100%;
  background-image: url(${props => props.img});
  height: 350px;
  height: 21.875rem;
  background-size: cover;
  background-position: center;
  display: grid;
  align-content: flex-end;
  cursor: pointer;
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 3px;
  border-radius: 0.1875rem;
  ${customMedia.greaterThan("desktop")`
    height: 300px;
    height: 18.75rem;
    display: block;
  `}
`

const QuizInfo = styled.div`
  background: ${props => props.theme.fontColor};
  color: ${props => props.theme.bgColor};
  padding: 10px 5%;
  padding: 0.625rem 5%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  transition: background 1s ease, color 1s ease;
  opacity: 0.9;
  border-bottom-left-radius: 3px;
  border-bottom-left-radius: 0.1875rem;
  border-bottom-right-radius: 3px;
  border-bottom-right-radius: 0.1875rem;
  ${customMedia.greaterThan("desktop")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    opacity: 0;
    :hover {
      opacity: 0.8;
    }
    transition: ${props => !props.changeWidth && "opacity 0.4s ease"};
    font-weight: 600;
    border-radius: 3px;
    border-radius: 0.1875rem;
  `}
`

const Topic = styled.div`
  margin-right: 20px;
  margin-right: 1.25rem;
  ${customMedia.greaterThan("desktop")`
    margin: 0px;
    margin-bottom: 20px;
    margin-bottom: 1.25rem;
  `}
`

const QuizNum = styled.div``

const Speed = ({ moveBot, changeWidth, setChangeWidth }) => {
  const onMouseEnter = () => {
    setChangeWidth(false)
  }
  const onMouseLeave = () => {
    setChangeWidth(true)
  }
  return (<Container moveBot={moveBot} changeWidth={changeWidth}>
    {speedQuizList.map((item, index) => {
      return <QuizList img={item.imageURL} key={index}>
        <QuizInfo changeWidth={changeWidth} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <Topic>{item.topic}</Topic>
          <QuizNum>{item.quizNum}문제</QuizNum>
        </QuizInfo>
      </QuizList>
    })}
  </Container>);
}

export default Speed;