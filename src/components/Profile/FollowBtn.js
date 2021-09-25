import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';

const SFollowBtn = styled.div`
  justify-self: center;
  align-self: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 30px;
    background-color: rgb(255, 165, 0, 0.4);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color linear 0.5s;
    :hover {
      background-color: rgb(255, 165, 0, 0.8);
    }
  }
`

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`
const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`

const FollowBtn = ({ isMe, isFollow, username, id }) => {
  const user = useUser()
  const history = useHistory()
  const updataFollowUser = (cache, result) => {
    const { data: { followUser: { ok } } } = result
    if (!ok) {
      return
    }
    cache.modify({
      id: `User:${id}`,
      fields: {
        isFollow(prev) { return !prev },
        totalFollow(prev) { return prev + 1 }
      }
    })
    cache.modify({
      id: `User:${user.id}`,
      fields: {
        totalFollowing(prev) { return prev + 1 }
      }
    })
  }
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    update: updataFollowUser
  })
  const updataUnfollowUser = (cache, result) => {
    const { data: { unfollowUser: { ok } } } = result
    if (!ok) {
      return
    }
    cache.modify({
      id: `User:${id}`,
      fields: {
        isFollow(prev) { return !prev },
        totalFollow(prev) { return prev - 1 }
      }
    })
    cache.modify({
      id: `User:${user.id}`,
      fields: {
        totalFollowing(prev) { return prev - 1 }
      }
    })
  }
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    update: updataUnfollowUser
  })
  const onClickUnfollow = () => {
    if (window.confirm(`${username}을/를 팔로우 취소하시겠습니까?`)) {
      unfollowUser({
        variables: { username }
      })
    }
  }
  const onClickFollowUser = () => {
    if (window.confirm(`${username}을/를 팔로우 하시겠습니까?`)) {
      followUser({
        variables: { username }
      })
    }
  }
  const sortFollow = () => {
    if (isFollow) {
      return <div onClick={onClickUnfollow}>팔로잉</div>
    } else {
      return <div onClick={onClickFollowUser}>팔로우</div>
    }
  }
  const onClickEdit = () => {
    history.push(`/profile/${username}/edit`)
  }
  return (<SFollowBtn>
    {isMe ? <div onClick={onClickEdit}>프로필 수정하기</div> : sortFollow()}
  </SFollowBtn>);
}

export default FollowBtn;