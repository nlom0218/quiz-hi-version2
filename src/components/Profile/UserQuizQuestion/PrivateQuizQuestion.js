import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PrivateQuestion from './PrivateQuestion';
import PrivateQuiz from './PrivateQuiz';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { FeedListContainerGsap } from '../../../hooks/Gsap';
import { useHistory, useParams } from 'react-router';
import QuizQuestionBasket from '../../QuizFeed/QuizQuestionBasket';
import PageBar from '../../QuizFeed/PageBar';
import useUser from '../../../hooks/useUser';
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

const ErrMsg = styled.div`
  color: tomato;
`

const PrivateQuizQuestion = ({ totalPrivateQuiz, totalPrivateQuestion, userId }) => {
  const { mode, state, type, username } = useParams()
  const user = useUser()
  const history = useHistory()
  const [lastPage, setLastPage] = useState(null)
  const [putQuiz, setPutQuiz] = useState(true)
  useEffect(() => {
    return setPutQuiz(false)
  }, [])
  const onClickTagType = (type) => {
    history.push(`/profile/${username}/${mode}/${state}/${type}/1`)
  }
  return (<Container className="userPrivateQuizQuestion">
    <FeedListContainerGsap layout="userPrivateQuizQuestion" />
    {user.username === username ?
      <React.Fragment>
        <TagType>
          <Title onClick={() => onClickTagType("quiz")} selected={type === "quiz"}>
            <FontAwesomeIcon icon={faBook} />
            <div>{totalPrivateQuiz}개의 퀴즈</div>
          </Title>
          <Title onClick={() => onClickTagType("question")} selected={type === "question"}>
            <FontAwesomeIcon icon={faBookOpen} />
            <div>{totalPrivateQuestion}개의 문제</div>
          </Title>
          <PageBar lastPage={lastPage} />
        </TagType>
        {type === "quiz" && <PrivateQuiz totalNum={totalPrivateQuiz} userId={userId} setLastPage={setLastPage} setPutQuiz={setPutQuiz} />}
        {type === "question" && <PrivateQuestion totalNum={totalPrivateQuestion} userId={userId} setLastPage={setLastPage} setPutQuiz={setPutQuiz} />}
        <QuizQuestionBasket setPutQuiz={setPutQuiz} />
      </React.Fragment>
      :
      <ErrMsg>해당 페이지에 접근 할 수 없습니다.</ErrMsg>
    }
  </Container>);
}

export default PrivateQuizQuestion;