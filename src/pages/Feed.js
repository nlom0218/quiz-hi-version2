import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import FeedType from '../components/QuizFeed/FeedType';
import SeeQuestion from '../components/QuizFeed/SeeQuestion';
import SeeQuiz from '../components/QuizFeed/SeeQuiz';
import NavBtn from '../components/NavBtn';
import { useHistory, useParams } from 'react-router';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import useUser from '../hooks/useUser';
import useTitle from '../hooks/useTitle';

const Feed = () => {
  const titleUpdataer = useTitle("QUIZ HI | 피드")
  const { type } = useParams()
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <PageTitle><FontAwesomeIcon icon={faClipboard} /> 피드</PageTitle>
      <FeedType feedType={type} feed={true} />
      {type === "quiz" && <SeeQuiz feedType={type} />}
      {type === "question" && <SeeQuestion feedType={type} />}
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default Feed;