import { useMutation } from '@apollo/client';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.form`
  display: grid;
  grid-template-columns: 260px 200px;
  column-gap: 20px;
  align-items: center;
  input {
    padding: 5px 20px;
    border-radius: 5px;
  }
`

const Title = styled.div``

const SubmitInput = styled.input`
  background-color: tomato;
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  text-align: center;
  cursor: pointer;
`

const ADMIN_DELETE_USER_MUTATION = gql`
  mutation adminDeleteUser($username: String!, ) {
    adminDeleteUser(username: $username) {
      ok
      error 
    }
  }
`

const DeleteUser = ({ username }) => {
  const { handleSubmit } = useForm({
    mode: 'onChange'
  })
  const onCompleted = (result) => {
    const { adminDeleteUser: { ok } } = result
    if (ok) {
      window.alert("요청이 성공적으로 수행되었습니다.")
    }
  }
  const [adminDeleteUser, { loading }] = useMutation(ADMIN_DELETE_USER_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    adminDeleteUser({
      variables: {
        username
      }
    })
  }
  return (<Container onSubmit={handleSubmit(onSubmit)}>
    <Title><FontAwesomeIcon icon={faSquare} /> 계정 삭제하기</Title>
    <SubmitInput
      type="submit"
      value="삭제하기" />
  </Container>);
}

export default DeleteUser;