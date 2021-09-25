import { useMutation, useQuery } from '@apollo/client';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import FollowItem from './FollowItem';
import SetSearchType from './SetSearchType';
import { FollowList } from './sharedCss';

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 360px 1fr;
  margin-bottom: 100px;
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const SearchBar = styled.div`
  form {
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 40px;
  }
  svg {
    margin-left: 10px;
    opacity: 0.8;
  }
  input {
    padding: 8px 20px;
    border-radius: 5px;
    ::placeholder {
      transition: color 1s ease, background-color 1s ease;
      color: ${props => props.theme.fontColor};
      opacity: 0.8;
    }
  }
`

const SearchInput = styled.input`
  background-color: rgb(200, 200, 200, 0.2);
`

const SubmitBtn = styled.input`
  background-color: ${props => props.theme.blueColor};
  color: ${props => props.theme.bgColor};
  opacity: ${props => props.disabled ? 0.6 : 1};
  cursor: pointer;
  transition: color 1s ease, background-color 1s ease, opacity 0.6s ease;
`

const NoMsg = styled.div`
  color: tomato;
  animation: ${fadeIn} 0.6s ease;
  text-align: center;
`

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  animation: ${fadeIn} 0.6s ease;
`

const PageBar = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  border: 1px solid rgb(200, 200, 200, 0.6);
  border-radius: 5px;
  display: flex;
  position: relative;
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

const SEARCH_USER_MUTATION = gql`
  mutation searchUser($nickname: String!, $type: String!, $page: Int!, $userId: Int!) {
    searchUser(nickname: $nickname, type: $type, page: $page, userId: $userId) {
      user {
        username
        avatarURL
        nickname
        type
        totalPublicQuiz
        totalPublicQuestion
      }
      totalNum
    }
  }
`

const FollowSearch = ({ userId }) => {
  const [type, setType] = useState("follower")
  const [page, setPage] = useState(1)
  const [user, setUser] = useState([])
  const [lastPage, setLastPage] = useState(1)
  const { register, handleSubmit, getValues, setValue, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { searchUser: { user, totalNum } } = result
    setUser(user)
    if (totalNum === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(totalNum / 10)) {
      setLastPage(totalNum / 10)
      return
    }
    const lastPage = Math.floor(totalNum / 10) + 1
    setLastPage(lastPage)
  }
  const [searchUser, { loading }] = useMutation(SEARCH_USER_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    const { nickname } = data
    if (loading) {
      return
    }
    if (nickname === "") {
      return
    }
    searchUser({
      variables: {
        userId,
        nickname,
        type,
        page
      }
    })
  }
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
  useEffect(() => {
    if (getValues("nickname") === "") {
      return
    }
    searchUser({
      variables: {
        userId,
        nickname: getValues("nickname"),
        type,
        page
      }
    })
  }, [page, type])
  return (<Container>
    <div><FontAwesomeIcon icon={faSearch} /> 팔로워 / 팔로잉 검색</div>
    <Layout>
      <SetSearchType setType={setType} type={type} setValue={setValue} setPage={setPage} />
      <SearchBar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchInput
            {...register("nickname", { required: true })}
            type="text"
            autoComplete="off"
            placeholder={`사용자의 닉네임을 검색하세요.`}
          />
          <SubmitBtn type="submit" value="검색" disabled={!isValid || getValues("nickname") === ""} />
        </form>
      </SearchBar>
      {user.length === 0 ? <NoMsg>검색된 유저가 없습니다.</NoMsg> :
        <ListContainer>
          <FollowList style={{ boxShadow: "none" }}>
            {user.map((item, index) => {
              return <FollowItem key={index} {...item} />
            })}
          </FollowList>
          <PageBar>
            <PageBarBtn firstPage={page === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
            <PageBarBtn lastPage={lastPage === page} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
          </PageBar>
        </ListContainer>
      }
    </Layout>
  </Container>);
}

export default FollowSearch;