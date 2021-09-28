
import gql from 'graphql-tag';
import React from 'react';

const ADMIN_SEE_QUESTION_COMPLAIN_QUERY = gql`
  query adminSeeQuestionComplain($page: Int!) {
    adminSeeQuestionComplain(page: $page) {
      questionComplain {
        question {
          question
          id
        }
        id
        message
        sender
        receiver
      }
    }
  }
`


const AdminQuestionComplain = () => {
  return (<>AdminQuestionComplain</>);
}

export default AdminQuestionComplain;