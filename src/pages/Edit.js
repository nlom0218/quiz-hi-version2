import React from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import EditQuestion from '../components/Edit/EditQuestion';
import EditQuiz from '../components/Edit/EditQuiz';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import useTitle from '../hooks/useTitle';

const Edit = () => {
  const titleUpdataer = useTitle("QUIZ HI | 수정")
  const { type } = useParams()
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      {type === "quiz" && <EditQuiz />}
      {type === "question" && <EditQuestion />}
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default Edit;