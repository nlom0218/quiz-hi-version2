import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PublicQuestion from './PublicQuestion';
import PublicQuiz from './PublicQuiz';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { FeedListContainerGsap } from '../../../hooks/Gsap';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useParams } from 'react-router';
import PageBar from '../../QuizFeed/PageBar';
import QuizQuestionBasket from '../../QuizFeed/QuizQuestionBasket';
gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 4fr 1fr;
  row-gap: 20px;
  column-gap: 30px;
`

const TagType = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 20px;
`

const Title = styled.div`
  align-self: flex-end;
  display: flex;
  cursor: pointer;
  opacity: ${props => props.selected ? 1 : 0.6};
  transition: opacity 0.3s linear;
  svg {
    margin-right: 10px;
  }
`


const PublicQuizQuestion = ({ totalPublicQuiz, totalPublicQuestion, userId }) => {
  const { mode, state, type, page, username } = useParams()
  const history = useHistory()
  const [lastPage, setLastPage] = useState(null)
  const [putQuiz, setPutQuiz] = useState(true)
  const onClickTagType = (type) => {
    history.push(`/profile/${username}/${mode}/${state}/${type}/1`)
  }
  return (<Container className="userPublicQuizQuestion">
    <FeedListContainerGsap layout="userPublicQuizQuestion" />
    <TagType>
      <Title onClick={() => onClickTagType("quiz")} selected={type === "quiz"}>
        <FontAwesomeIcon icon={faBook} />
        <div>{totalPublicQuiz}개의 퀴즈</div>
      </Title>
      <Title onClick={() => onClickTagType("question")} selected={type === "question"}>
        <FontAwesomeIcon icon={faBookOpen} />
        <div>{totalPublicQuestion}개의 문제</div>
      </Title>
      <PageBar lastPage={lastPage} />
    </TagType>
    {type === "quiz" && <PublicQuiz totalNum={totalPublicQuiz} userId={userId} setLastPage={setLastPage} setPutQuiz={setPutQuiz} />}
    {type === "question" && <PublicQuestion totalNum={totalPublicQuestion} userId={userId} setLastPage={setLastPage} setPutQuiz={setPutQuiz} />}
    <QuizQuestionBasket setPutQuiz={setPutQuiz} />
  </Container>);
}

export default PublicQuizQuestion;