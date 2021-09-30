import { useMutation } from '@apollo/client';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.form`
  display: grid;
  grid-template-columns: 260px 3fr 1fr;
  column-gap: 20px;
  align-items: center;
  input {
    padding: 10px 20px;
    border-radius: 5px;
  }
`

const Title = styled.div``

const EmailInput = styled.input`
  background-color: rgb(200, 200, 200, 0.4);
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.6;
    transition: color 1s ease;
  }
  transition: background-color 1s ease;
`

const SubmitInput = styled.input`
  background-color: ${props => props.theme.blueColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  text-align: center;
  cursor: pointer;
`

const ADMIN_CHANGE_USER_TYPE_MUTATION = gql`
  mutation adminChangeUserType($username: String!, $email: String!) {
    adminChangeUserType(username: $username, email: $email) {
      ok
      error 
    }
  }
`

const ChangeUserType = ({ username }) => {
  const { register, handleSubmit } = useForm({
    mode: 'onChange'
  })
  const onCompleted = (result) => {
    const { adminChangeUserType: { ok } } = result
    if (ok) {
      window.alert("요청이 성공적으로 수행되었습니다.")
    }
  }
  const [adminChangeUserType, { loading }] = useMutation(ADMIN_CHANGE_USER_TYPE_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { email } = data
    adminChangeUserType({
      variables: {
        email,
        username
      }
    })
  }
  return (<Container onSubmit={handleSubmit(onSubmit)}>
    <Title><FontAwesomeIcon icon={faSquare} /> 선생님 계정으로 변경하기</Title>
    <EmailInput
      {...register("email", { required: true })}
      type="text"
      autoComplete="off"
      placeholder="등록할 이메일을 입력하세요."
    />
    <SubmitInput
      type="submit"
      value="변경" />
  </Container>);
}

export default ChangeUserType;