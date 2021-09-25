import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { FollowTitle, FollowList, NoUserMsg } from "./sharedCss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import FollowItem from './FollowItem';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const SPageBar = styled.div`
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

const SEE_FOLLOWING_QUERY = gql`
  query Query($userId: Int!, $page: Int!) {
    seeFollowing(userId: $userId, page: $page) {
      username
      avatarURL
      nickname
      type
      totalPublicQuiz
      totalPublicQuestion
    }
  }
`

const SeeFollowing = ({ userId, totalFollowing }) => {
  const [lastPage, setLastPage] = useState(1)
  const onCompleted = () => {
    if (totalFollowing === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(totalFollowing / 10)) {
      setLastPage(totalFollowing / 10)
      return
    }
    const lastPage = Math.floor(totalFollowing / 10) + 1
    setLastPage(lastPage)
  }
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery(SEE_FOLLOWING_QUERY, {
    variables: {
      userId,
      page
    },
    skip: !userId,
    onCompleted
  })
  const onClickPageBtn = (btn) => {
    if (btn === "pre") {
      if (page === 1) {
        return
      }
      setPage(prev => prev - 1)
    } else if (btn === "next") {
      if (lastPage === page) {
        return
      }
      setPage(prev => prev + 1)
    }
  }
  return (
    loading ? "loading..." :
      <Container>
        <FollowTitle>
          <FontAwesomeIcon icon={faUserFriends} />
          <div>팔로잉 {totalFollowing}명</div>
          <SPageBar>
            <PageBarBtn firstPage={page === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
            <PageBarBtn lastPage={lastPage === page} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
          </SPageBar>
        </FollowTitle>
        {totalFollowing === 0 ? <NoUserMsg>팔로잉이 없습니다.</NoUserMsg> :
          <FollowList>
            {data?.seeFollowing.map((item, index) => {
              return <FollowItem key={index} {...item} />
            })}
          </FollowList>
        }
      </Container>
  );
}

export default SeeFollowing;