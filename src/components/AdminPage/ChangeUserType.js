import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.form`
  display: grid;
  grid-template-columns: auto 3fr 1fr;
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

const ChangeUserType = () => {
  const { register } = useForm({
    mode: 'onChange'
  })
  return (<Container>
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