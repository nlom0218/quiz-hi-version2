import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  z-index: -2;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `}
`

const QuizList = styled.div`
  width: 100%;
  background-image: url(${props => props.img});
  height: 350px;
  height: 21.875rem;
  background-size: cover;
  background-position: center;
  ${customMedia.greaterThan("desktop")`
    height: 300px;
    height: 18.75rem;
  `}
`

const Speed = () => {
  return (<Container>
    <QuizList img="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1548&q=80">
    </QuizList>
    <QuizList img="https://images.unsplash.com/photo-1550985543-49bee3167284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80">
    </QuizList>
    <QuizList img="https://images.unsplash.com/photo-1571254120989-7a3c07c50c98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80">
    </QuizList>
  </Container>);
}

export default Speed;