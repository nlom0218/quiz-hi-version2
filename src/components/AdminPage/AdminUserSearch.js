import { useMutation } from '@apollo/client';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
`

const SearchForm = styled.form`
  grid-template-columns: 1 / 2;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 20px;
  input {
    padding: 10px 20px;
    background-color: rgb(200, 200, 200, 0.4);
    border-radius: 5px;
  }
  .submitInput {
    text-align: center;
    background-color: ${props => props.theme.blueColor};
    color: ${props => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
    cursor: pointer;
  }
`

const UserList = styled.div`
  grid-column: 1 / -1;
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
  }
`

const UserItem = styled.div`
  padding: 17px 20px;
  line-height: 160%;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: 1fr 3fr 4fr 3fr 1fr 1fr;
  column-gap: 10px;
  :hover {
    background-color: ${props => props.theme.grayColor};
  }
`

const EditBtn = styled.div`
  justify-self: flex-end;
`

const Msg = styled.div`
  grid-column: 1 / -1;
  color: tomato;
`

const ADMIN_USER_SEARCH_MUTATION = gql`
  mutation adminSearchUser($username: String!) {
    adminSearchUser(username: $username) {
      id
      username
      email
      nickname
      type
    }
  }
`

const AdminUserSearch = () => {
  const [user, setUser] = useState(undefined)
  const [msg, setMsg] = useState(undefined)
  const onCompleted = (result) => {
    const { adminSearchUser } = result
    if (!adminSearchUser) {
      setMsg("검색결과가 없습니다.")
    } else {
      setUser(adminSearchUser)
    }
  }
  const [adminSearchUser, { loading }] = useMutation(ADMIN_USER_SEARCH_MUTATION, {
    onCompleted
  })
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    setMsg(undefined)
    setUser(undefined)
    const { username } = data
    adminSearchUser({
      variables: {
        username
      }
    })
  }
  const processType = (type) => {
    if (type === "teacher") {
      return "선생님"
    } else if (type === "nomal") {
      return "일반"
    } else {
      return "학생"
    }
  }
  return (<Container>
    <SearchForm onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: true })}
        type="text"
        autoComplete="off"
      />
      <input
        className="submitInput"
        type="submit"
        value="검색"
      />
    </SearchForm>
    {user && <UserList>
      <div className="sortItem">
        <div>id</div>
        <div>아이디</div>
        <div>이메일</div>
        <div>닉네임</div>
        <div>타입</div>
      </div>
      <UserItem>
        <div>{user.id}</div>
        <div>{user.username}</div>
        <div>{user.email}</div>
        <div>{user.nickname}</div>
        <div>{processType(user.type)}</div>
        <EditBtn><FontAwesomeIcon icon={faCog} /></EditBtn>
      </UserItem>
    </UserList>}
    {msg && <Msg>검색결과가 없습니다.</Msg>}
  </Container>);
}

export default AdminUserSearch;