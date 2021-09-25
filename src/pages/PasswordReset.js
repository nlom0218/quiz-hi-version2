import React, { useState } from 'react';
import AccountContainer from '../components/Account/AccountContainer';
import Title from '../components/Account/Title';
import FormLayout from '../components/Account/FormLayout';
import styled from 'styled-components';
import ErrMsg from '../components/Account/ErrMsg';
import { useForm } from 'react-hook-form';
import PasswordEmailForm from '../components/Account/PasswordEmailForm';
import InputLayout from '../components/Account/InputLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import InputBtn from '../components/InputBtn';
import gql from 'graphql-tag';
import { useMutation, useReactiveVar } from '@apollo/client';
import { useHistory } from 'react-router';
import ConfirmUsername from '../components/Account/ConfirmUsername';
import PageBar from '../components/Account/PageBar';
import PageBarItem from '../components/Account/PageBarItem';
import { faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { darkModeVar } from '../apollo';
import { onCLickDarkMode } from '../sharedFn';

const AccountLink = styled.div`
  justify-self: center;
  font-size: 14px;
  text-decoration: underline;
  a {
    opacity: 0.8;
  }
`

const RESET_PASSWORD_MUTATION = gql`
mutation resetPassword($email: String!, $newPassword: String!, $newPasswordConfirm: String!) {
  resetPassword(email: $email, newPassword: $newPassword, newPasswordConfirm: $newPasswordConfirm) {
      ok
      error
    }
  }
`

const PasswordReset = () => {
  const darkMode = useReactiveVar(darkModeVar)
  const history = useHistory()
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const [error, setError] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [doneConfirm, setDoneConfirm] = useState(false)
  const onCompleted = (result) => {
    const { resetPassword: { ok, error } } = result
    if (error) {
      setError(error)
    }
    if (ok) {
      setError("비밀번호가 변경되었습니다.")
    }
  }
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted
  })
  const [visible, setVisible] = useState(false)
  const onClickEye = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  const onSubmit = (data) => {
    const { password, passwordConfirm } = data
    if (loading) {
      return
    }
    resetPassword({
      variables: {
        email,
        newPassword: password,
        newPasswordConfirm: passwordConfirm
      }
    })
  }
  return (<AccountContainer>
    <Title page="아이디/비밀번호 찾기" />
    <FormLayout>
      <PasswordEmailForm setError={setError} setDoneConfirm={setDoneConfirm} setEmail={setEmail} />
      {doneConfirm && <ConfirmUsername email={email} />}
      <form className="loginCreateAccountForm" onSubmit={handleSubmit(onSubmit)}>
        <InputLayout>
          <span>
            새 비밀번호
            <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
          </span>
          <input type={visible ? "text" : "password"} {...register("password", { required: true })} autoComplete="off" />
        </InputLayout>
        <InputLayout>
          <span>
            새 비밀번호 확인
            </span>
          <input type={visible ? "text" : "password"} {...register("passwordConfirm", { required: true })} autoComplete="off" />
        </InputLayout>
        {error ? <ErrMsg error={error} /> : null}
        <InputBtn value="비밀번호 변경하기" disabled={!isValid || !doneConfirm} bgColor="rgb(42, 140, 0, 0.6)" />
        <AccountLink>
          <Link to="/login">로그인하러 가기</Link>
        </AccountLink>
      </form>
    </FormLayout>
    <PageBar>
      <PageBarItem>
        <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
      </PageBarItem>
      <PageBarItem>
        <FontAwesomeIcon
          icon={darkMode ? faSun : faMoon}
          onClick={() => onCLickDarkMode(darkMode)}
          style={{ color: `${darkMode ? "#ff765e" : "#212121"}` }}
        />
      </PageBarItem>
      <PageBarItem>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </PageBarItem>
    </PageBar>
  </AccountContainer>);
}

export default PasswordReset;