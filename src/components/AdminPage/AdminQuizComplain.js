import gql from 'graphql-tag';
import React from 'react';

const ADMIN_SEE_QUIZ_COMPLAIN_QUERY = gql`
  query adminSeeQuizComplain($page: Int!) {
    adminSeeQuizComplain(page: $page) {
      quizComplain {
        quiz {
          title
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


const AdminQuizComplain = () => {
  return (<>AdminQuizComplain</>);
}

export default AdminQuizComplain;