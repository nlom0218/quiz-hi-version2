import { useLazyQuery, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { faCircle, faEye, faEyeSlash, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darkModeVar, logInUser } from '../apollo';
import AccountContainer from '../components/Account/AccountContainer';
import ErrMsg from '../components/Account/ErrMsg';
import FormLayout from '../components/Account/FormLayout';
import InputBtn from '../components/InputBtn';
import InputLayout from '../components/Account/InputLayout';
import Title from '../components/Account/Title';
import PageBar from '../components/Account/PageBar';
import PageBarItem from '../components/Account/PageBarItem';
import { onCLickDarkMode } from '../sharedFn';
import QusetionContainer from '../components/Question/QuestionContainer';
import LoginQuestion from '../components/Question/LoginQuestion';
import useTitle from '../hooks/useTitle';

const SelectType = styled.div`
  .title {
    margin-bottom: 20px;
  }
  .selectBox {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    svg {
      font-size: 14px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`

const AccountLink = styled.div`
  justify-self: center;
  a {
    font-weight: 600;
    color: ${props => props.theme.blueColor};
  }
`

const FindPasswordLink = styled.div`
  justify-self: center;
  font-size: 14px;
  text-decoration: underline;
  a {
    opacity: 0.8;
  }
`

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!, $type: String!) {
    login(username: $username, password: $password, type: $type) {
      ok
      error
      token
    }
  }
`

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      firstPage
      type
    }
  }
`

const Login = () => {
  const titleUpdataer = useTitle("QUIZ HI | 로그인")
  const darkMode = useReactiveVar(darkModeVar)
  const history = useHistory()
  const [type, setType] = useState("teacher")
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(undefined)
  const [questionMode, setQuestionMode] = useState(false)
  const { register, handleSubmit, formState: { isValid }, getValues } = useForm({
    mode: "onChange"
  })
  const onCompleted = (data) => {
    const { login: { ok, error, token } } = data
    if (error) {
      setError(error)
    }
    if (ok) {
      logInUser(token)
      refetch()
      if (!profileLoading) {
        if (profileData?.seeProfile?.type === "student") {
          history.push(`/profile/${profileData?.seeProfile?.username}/info`)
          return
        }
        history.push(profileData?.seeProfile?.firstPage)
      }
    }
  }
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted
  })
  const { data: profileData, loading: profileLoading, refetch } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: getValues("username")
    },
    skip: Boolean(!getValues("username"))
  })
  const onClickType = (type) => {
    setType(type)
  }
  const onClickEye = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { username, password } = data
    login({
      variables: { username, password, type }
    })
  }
  const onClickQuestionMode = () => {
    setQuestionMode(true)
  }
  return (
    <AccountContainer>
      <Title page="로그인" />
      <FormLayout>
        <form className="loginCreateAccountForm" onSubmit={handleSubmit(onSubmit)}>
          <SelectType>
            <div className="title">계정 유형</div>
            <div className="selectBox">
              <div className="selectItem">
                <FontAwesomeIcon icon={type === "teacher" ? faCheckCircle : faCircle} onClick={() => onClickType("teacher")} />
                <span className="typeName">선생님</span>
              </div>
              <div className="selectItem">
                <FontAwesomeIcon icon={type === "nomal" ? faCheckCircle : faCircle} onClick={() => onClickType("nomal")} />
                <span className="typeName">일반인</span>
              </div>
              <div className="selectItem">
                <FontAwesomeIcon icon={type === "student" ? faCheckCircle : faCircle} onClick={() => onClickType("student")} />
                <span className="typeName">학생</span>
              </div>
            </div>
          </SelectType>
          <InputLayout>
            <span>아이디</span>
            <input
              {...register("username", {
                required: true
              })}
              type="text"
              autoComplete="off"
            />
          </InputLayout>
          <InputLayout>
            <span>
              비밀번호
                <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
            </span>
            <input
              {...register("password", {
                required: true
              })}
              type={visible ? "text" : "password"}
              autoComplete="off"
            />
          </InputLayout>
          {error ? <ErrMsg error={error} /> : null}
          <InputBtn value="로그인" disabled={!isValid} bgColor="rgb(42, 140, 0, 0.6)" />
          <AccountLink>
            계정이 없으신가요? <Link to="/create-account"><span>계정 만들기</span></Link>
          </AccountLink>
          <FindPasswordLink>
            <Link to="/password-reset">아이디/비밀번호를 잊으셨나요?</Link>
          </FindPasswordLink>
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
          <FontAwesomeIcon icon={faQuestionCircle} onClick={onClickQuestionMode} />
        </PageBarItem>
      </PageBar>
      {questionMode && <QusetionContainer pageTitle="로그인" setQuestionMode={setQuestionMode} >
        <LoginQuestion />
      </QusetionContainer>}
    </AccountContainer>);
}

export default Login;