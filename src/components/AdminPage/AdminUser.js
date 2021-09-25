import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const SetTypeBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 60px;
`

const Type = styled.div`
  text-align: center;
  background-color: ${props => props.theme.blueColor};
  color: ${props => props.theme.bgColor};
  opacity: ${props => props.selected ? 1 : 0.6};
  padding: 10px;
  border-radius: 5px;
  transition: opacity 0.6s ease;
  cursor: pointer;
`

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
  const { loading, data, refetch } = useQuery(ADMIN_SEE_USER_QUERY, {
    variables: {
      type,
      page
    }
  })
  console.log(data);
  const onClickType = (type) => {
    setType(type)
    refetch()
  }
  return (<Container>
    <SetTypeBtn>
      <Type
        selected={type === "all"}
        onClick={() => onClickType("all")}
      >모두</Type>
      <Type
        selected={type === "teacher"}
        onClick={() => onClickType("teacher")}
      >선생님</Type>
      <Type
        selected={type === "nomal"}
        onClick={() => onClickType("nomal")}
      >일반</Type>
      <Type
        selected={type === "student"}
        onClick={() => onClickType("student")}
      >학생</Type>
    </SetTypeBtn>
  </Container>);
}

export default AdminUser;