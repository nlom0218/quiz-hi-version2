import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminUserSearch from './AdminUserSearch';
import UserItem from './UserItem';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  margin-bottom: 60px;
  .topContent {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: flex-end;
  }
`

const SetTypeBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
  grid-template-columns: 1fr;
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
    div {
      font-weight: 600;
    }
  }
`

const PageBar = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  border: 1px solid rgb(200, 200, 200, 0.6);
  background-color: ${props => props.theme.bgColor};
  border-radius: 5px;
  display: flex;
  position: relative;
  transition: background-color 1s ease;
`

const PageBarBtn = styled.div`
  padding: 8px 20px;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  :first-child {
    border-right: 1px solid rgb(200, 200, 200, 0.6);
    opacity: ${props => props.firstPage ? "0.4" : "1"};
    cursor: ${props => props.firstPage ? "not-allowd" : "pointer"};
  }
  :nth-child(2) {
    opacity: ${props => props.lastPage ? "0.4" : "1"};
    cursor: ${props => props.lastPage ? "not-allowd" : "pointer"};
  }
`

const UserTotalNum = styled.div``

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
  const [totalNum, setTotalNum] = useState(null)
  const [type, setType] = useState(undefined)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const onCompleted = (result) => {
    const { adminSeeUser: { user, totalNum } } = result
    setUser(user)
    setTotalNum(totalNum)
    if (totalNum === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(totalNum / 20)) {
      setLastPage(totalNum / 20)
      return
    }
    const lastPage = Math.floor(totalNum / 20) + 1
    setLastPage(lastPage)
  }
  const [adminSeeUser, { loading }] = useLazyQuery(ADMIN_SEE_USER_QUERY, {
    onCompleted
  })
  const onClickType = (type) => {
    setPage(1)
    setType(type)
    adminSeeUser({
      variables: {
        type,
        page
      }
    })
  }
  const onClickSearch = () => {
    setType("search")
    setUser([])
  }
  useEffect(() => {
    if (!type) {
      return
    }
    adminSeeUser({
      variables: {
        type,
        page
      }
    })
  }, [page])
  const onClickPageBtn = (btn) => {
    if (btn === "pre") {
      if (page === 1) {
        return
      } else {
        setPage(prev => prev - 1)
      }
    } else if (btn === "next") {
      if (lastPage === page) {
        return
      } else {
        setPage(prev => prev + 1)
      }
    }
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
      <Type
        selected={type === "search"}
        onClick={() => onClickSearch("search")}
      >검색</Type>
    </SetTypeBtn>
    {user.length === 0 ? "" :
      <React.Fragment>
        <div className="topContent">
          <UserTotalNum>{totalNum}명의 유저</UserTotalNum>
          <PageBar>
            <PageBarBtn firstPage={page === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
            <PageBarBtn lastPage={lastPage === page} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
          </PageBar>
        </div>
        <UserList>
          <div className="sortItem">
            <div>id</div>
            <div>아이디</div>
            <div>이메일</div>
            <div>닉네임</div>
            <div>타입</div>
          </div>
          {user.map((item, index) => {
            return <UserItem key={index} {...item} type={type} />
          })}
        </UserList>
      </React.Fragment>

    }
    {type === "search" &&
      <AdminUserSearch />}
  </Container>);
}

export default AdminUser;