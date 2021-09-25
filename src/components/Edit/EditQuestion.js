import { useQuery } from '@apollo/client';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import EditQuestionForm from './EditQuestionForm';
import { PageTitle, PrePage } from './sharedCss';

const Container = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  row-gap: 30px;
 `


const DETAIL_QUESTION_QUERY = gql`
  query detailQuestion($id: Int!) {
    detailQuestion(id: $id) {
      id
      question
      distractor
      hint
      answer
      image
      updateInfo
      type
      user {
        id
      }
      tags {
        id
        name
      }
    } 
  }
`

const EditQuestion = () => {
  const history = useHistory()
  const { id } = useParams()
  const { data, loading } = useQuery(DETAIL_QUESTION_QUERY, { variables: { id: parseInt(id) } })
  const onClickPreBtn = () => {
    history.push(`/detail/question/${id}`)
  }
  return (<Container>
    {loading ? <div>Loading...</div> :
      <React.Fragment>
        <PageTitle>
          <div><FontAwesomeIcon icon={faEdit} />문제 수정</div>
          <div className="navBtn">
            {/* <PrePage onClick={onClickPreBtn}>이전페이지</PrePage> */}
            <Link
              className="delBtn"
              to={{
                pathname: `/delete/question/${id}`,
                state: { userId: data.detailQuestion.user.id }
              }}
            ><FontAwesomeIcon icon={faTrash} />문제 삭제</Link>
          </div>
        </PageTitle>
        <EditQuestionForm {...data.detailQuestion} />
      </React.Fragment>
    }
  </Container>);
}

export default EditQuestion;