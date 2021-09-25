import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import QuestionLibrary from '../components/Library/QuestionLibrary';
import QuizLibrary from '../components/Library/QuizLibrary';
import PageTitle from '../components/PageTitle';
import FeedType from '../components/QuizFeed/FeedType';
import useTitle from '../hooks/useTitle';

const Library = () => {
  const titleUpdataer = useTitle("QUIZ HI | 라이브러리")
  const { type } = useParams()
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        <PageTitle><FontAwesomeIcon icon={faBookReader} /> 라이브러리</PageTitle>
        <FeedType feedType={type} />
        {type === "quiz" && <QuizLibrary />}
        {type === "question" && <QuestionLibrary />}
      </BasicContainer>
    </React.Fragment>
  );
}

export default Library;