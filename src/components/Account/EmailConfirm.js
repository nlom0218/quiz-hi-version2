import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Form = styled.form`
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 10px;
`

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgb(200, 200, 200, 0.2);
  transition: background-color 1s ease, box-shadow 0.4s linear;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
  }
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.6;
  }
`

const InputBtn = styled.button`
  background-color: rgb(200, 200, 200);
  opacity: ${props => props.disabled ? 0.2 : 0.9};
  padding: 10px 20px;
  border-radius: 5px;
  transition: opacity 0.6s linear;
  cursor: pointer;
`

const EmailConfirm = ({ confirmNum, setDoneConfirm, setError }) => {
  const [confirm, setConfirm] = useState("init")
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const { inputNum } = data
    if (confirmNum === parseInt(inputNum)) {
      setDoneConfirm(true)
      setConfirm("true")
    } else {
      setError("인증번호를 다시 입력해 주세요.")
      setConfirm("false")
      setTimeout(() => {
        setError(undefined)
        setConfirm("init")
      }, 4000)
    }
  }
  const confirmIcon = () => {
    if (confirm === "true") {
      return <FontAwesomeIcon icon={faCheck} />
    } else if (confirm === "false") {
      return <FontAwesomeIcon icon={faTimes} />
    }
    return "확인"
  }
  return (<Form onSubmit={handleSubmit(onSubmit)}>
    <Input type="text" placeholder="인증숫자를 입력해주세요."
      {...register("inputNum", {
        required: true
      })}
      autoComplete="off"
    />
    <InputBtn type="submit" disabled={!isValid} >
      {confirmIcon()}
    </InputBtn>
  </Form>);
}

export default EmailConfirm;