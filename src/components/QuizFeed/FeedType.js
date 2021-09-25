import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FeedTypeWrapper = styled.div`
  grid-column: 7 / 12;
  justify-self: flex-end;
  align-self: center;
  display: flex;
`

const SFeedType = styled.div`
  margin-left: 20px;
  padding: 5px 20px;
  background-color: ${props => props.selected ? "rgb(201, 102, 255, 0.6 )" : "rgb(201, 102, 255, 0.2)"};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s linear;
`

const FeedType = ({ feedType, feed }) => {
  return (<FeedTypeWrapper>
    <Link
      to={feed ? "/feed/quiz/all/recent/1" : "/library/quiz/1"}
    >
      <SFeedType selected={feedType === "quiz"}>퀴즈</SFeedType></Link>
    <Link
      to={feed ? "/feed/question/all/recent/1" : "/library/question/1"}
    >
      <SFeedType selected={feedType === "question"}>문제</SFeedType></Link>
  </FeedTypeWrapper>);
}

export default FeedType;