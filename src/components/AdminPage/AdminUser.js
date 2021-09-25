import { useLazyQuery, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import UserItem from './UserItem';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
  margin-bottom: 60px;
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
  transition: opacity 0.6s ease, color 1s ease, background-color 1s ease;
  cursor: pointer;
`

const UserList = styled.ul`
  display: grid;
  background-color: rgb(200, 200, 200, 0.8);
  row-gap: 1px;
  border: 1px solid rgb(200, 200, 200, 0.8);
  .sortItem {
    padding: 15px 20px;
    background-color: ${props => props.theme.blueColor};
    color: ${props => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
    display: grid;
    grid-template-columns: 1fr 3fr 4fr 3fr 1fr 1fr;
    column-gap: 10px;
  }
`

const ADMIN_SEE_USER_QUERY = gql`
  query adminSeeUser($type: String!, $page: Int!) {
    adminSeeUser(type: $type, page: $page) {
      user {
        id
        username
        email
        nickname
        type
      }
      totalNum
    }
  }
`


const AdminUser = () => {
  const [user, setUser] = useState([])
  const [type, setType] = useState(undefined)
  const [page, setPage] = useState(1)
  const onCompleted = (result) => {
    const { adminSeeUser: { user, totalNum } } = result
    setUser(user)
  }
  const [adminSeeUser, { loading }] = useLazyQuery(ADMIN_SEE_USER_QUERY, {
    onCompleted
  })
  const onClickType = (type) => {
    setType(type)
    adminSeeUser({
      variables: {
        type,
        page
      }
    })
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
    {loading ? "loading..." :
      <UserList>
        <div className="sortItem">
          <div>id</div>
          <div>아이디</div>
          <div>이메일</div>
          <div>닉네임</div>
          <div>타입</div>
        </div>
        {user.map((item, index) => {
          return <UserItem key={index} {...item} />
        })}
      </UserList>
    }
  </Container>);
}

export default AdminUser;