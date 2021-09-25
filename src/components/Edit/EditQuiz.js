import { useQuery } from '@apollo/client';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faBookOpen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddOrDisConnectQuestions from './AddOrDisConnectQuestions';
import AddQuestions from './AddQuestions';
import DisconnectQuestions from './DisconnectQuestions';
import EditQuizForm from './EditQuizForm';
import { PageTitle, PrePage } from './sharedCss';

const Container = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  row-gap: 30px;
 `

const DivisionLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgb(200, 200, 200, 0.6);
  transition: background-color 1s ease;
`

const DETAIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
      caption
      updateInfo
      state
      user {
        id
      }
      tags {
        id
        name
      }
      questions {
        user {
          id
          nickname
          avatarURL
          username
        }
        question
        id
        type
        tags {
          id
          name
        }
        isLiked
        likes
        createdAt
        hits
      }
    } 
  }
`

const EditQuiz = () => {
  const { id } = useParams()
  const history = useHistory()
  const { data, loading } = useQuery(DETAIL_QUIZ_QUERY, { variables: { id: parseInt(id) } })
  const onClickPreBtn = () => {
    history.push(`/detail/quiz/${id}`)
  }
  return (<Container>
    {loading ? <div>Loading...</div> :
      <React.Fragment>
        <PageTitle>
          <div><FontAwesomeIcon icon={faEdit} />퀴즈 수정</div>
          <div className="navBtn">
            {/* <PrePage onClick={onClickPreBtn}>이전페이지</PrePage> */}
            <Link
              className="delBtn"
              to={{
                pathname: `/delete/quiz/${id}`,
                state: { userId: data.detailQuiz.user.id }
              }}><FontAwesomeIcon icon={faTrash} />퀴즈 삭제</Link>
          </div>
        </PageTitle>
        <EditQuizForm {...data.detailQuiz} />
        <PageTitle style={{ marginTop: "40px" }}>
          <div><FontAwesomeIcon icon={faBookOpen} />문제 추가 & 삭제</div>
          {/* <PrePage onClick={onClickPreBtn}>이전페이지</PrePage> */}
        </PageTitle>
        <AddOrDisConnectQuestions>
          <AddQuestions {...data.detailQuiz} />
          <DisconnectQuestions questions={data.detailQuiz.questions} />
        </AddOrDisConnectQuestions>
      </React.Fragment>
    }
  </Container>);
}

export default EditQuiz;