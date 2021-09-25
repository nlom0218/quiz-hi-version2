import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``

const ADMIN_SEE_USER_QUERY = gql`
  query adminSeeUser($type: String!, $page: Int!) {
    adminSeeUser(type: $type, page: $page) {
      user {
        id
        username
      }
      totalNum
    }
  }
`


const AdminUser = () => {
  const [type, setType] = useState("all")
  const [page, setPage] = useState(1)
  const { loading, data } = useQuery(ADMIN_SEE_USER_QUERY, {
    variables: {
      type,
      page
    }
  })
  console.log(data);
  return (<Container>

  </Container>);
}

export default AdminUser;