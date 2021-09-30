import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminUserSearch from './AdminUserSearch';
import { PageBar, PageBarBtn, SetTypeBtn, TotalNum, Type } from '../sharedCss';
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
  const [seeType, setSeeType] = useState(undefined)
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
    setSeeType(type)
    adminSeeUser({
      variables: {
        type,
        page
      }
    })
  }
  const onClickSearch = () => {
    setSeeType("search")
    setUser([])
  }
  useEffect(() => {
    if (!seeType) {
      return
    }
    adminSeeUser({
      variables: {
        type: seeType,
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
        selected={seeType === "all"}
        onClick={() => onClickType("all")}
      >모두</Type>
      <Type
        selected={seeType === "teacher"}
        onClick={() => onClickType("teacher")}
      >선생님</Type>
      <Type
        selected={seeType === "nomal"}
        onClick={() => onClickType("nomal")}
      >일반</Type>
      <Type
        selected={seeType === "student"}
        onClick={() => onClickType("student")}
      >학생</Type>
      <Type
        selected={seeType === "search"}
        onClick={() => onClickSearch("search")}
      >검색</Type>
    </SetTypeBtn>
    {user.length === 0 ? "" :
      <React.Fragment>
        <div className="topContent">
          <TotalNum>{totalNum}명의 유저</TotalNum>
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
            return <UserItem key={index} {...item} seeType={seeType} />
          })}
        </UserList>
      </React.Fragment>
    }
    {seeType === "search" &&
      <AdminUserSearch />}
  </Container>);
}

export default AdminUser;