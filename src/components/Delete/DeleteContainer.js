import { useMutation } from '@apollo/client';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';
import InputLayout from '../MakeQuiz/InputLayout';
import DeleteBtn from './DeleteBtn';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const PageTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  svg {
    margin-right: 10px;
  }
`

const DeleteMsg = styled.div`
  padding: 40px 30px;
  border: 1px solid rgb(200, 200, 200, 0.8);
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  transition: border 1s ease, background-color 1s ease;
  background-color: ${props => props.theme.boxColor};
`

const CheckPassword = styled.form`
  display: grid;
  grid-template-columns: 1fr auto 1.7fr;
  column-gap: 20px;
  svg {
    cursor: pointer;
  }
`

const InputBtn = styled.input`
  background-color: rgb(200, 200, 200, 0.2);
  padding: 11.5px 20px;
  border-radius: 5px;
  justify-self: flex-start;
  align-self: flex-end;
  opacity: ${props => props.disabled ? 0.4 : 1};
  transition: opacity 0.6s linear;
`

const ErrMsg = styled.div`
  animation: ${fadeIn} 0.3s linear;
  justify-self: flex-start;
  align-self: flex-end;
  color: tomato;
`

const CONFIRM_PASSWORD_MUTATION = gql`
  mutation confirmPassword($password: String!) {
    confirmPassword(password: $password) {
      ok
      error
    }
  }
`

const DeleteContainer = () => {
  const { type } = useParams()
  const history = useHistory()
  const location = useLocation()
  const user = useUser()
  useEffect(() => {
    if (!user) {
      alert("해당 페이지에서는 새로고침을 할 수 없거나 퀴즈 / 문제 삭제 권한이 없습니다.")
      history.push("/")
      return
    }
    if (user.id !== location.state.userId) {
      alert("해당 페이지에서는 새로고침을 할 수 없거나 퀴즈 / 문제 삭제 권한이 없습니다.")
      history.push("/")
    }
  }, [])
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const [errMsg, setErrMsg] = useState(null)
  const [delMode, setDelMode] = useState(false)
  const [visible, setVisible] = useState(false)
  const onClickEye = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  const onCompleted = (result) => {
    const { confirmPassword: { ok, error } } = result
    if (!ok) {
      setErrMsg(error)
    } else if (ok) {
      setErrMsg("인증되었습니다.")
      setDelMode(true)
    }
  }
  const [confirmPassword, { loading }] = useMutation(CONFIRM_PASSWORD_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    confirmPassword({
      variables: {
        password: data.password
      }
    })
  }
  return (<Container>
    <PageTitle>
      <FontAwesomeIcon icon={faTrash} />{type === "quiz" ? "퀴즈" : "문제"} 삭제
    </PageTitle>
    <DeleteMsg>
      <div className="delMsg">∙ 삭제된 퀴즈 / 문제는 다시 복구되지 않습니다.</div>
      <div className="delMsg">∙ 퀴즈를 삭제 할 경우 퀴즈의 문제는 삭제되지 않습니다.</div>
      <div className="delMsg">∙ 해당 퀴즈를 숙제로 활용한 경우 학생들은 퀴즈의 정답과 오답을 확인할 수 없습니다.</div>
      <div className="delMsg">∙ 공유한 퀴즈 / 문제인 경우 이를 공유한 사용자들은 더 이상 해당 퀴즈 / 문제를 사용할 수 없습니다.</div>
      <div className="delMsg">∙ 퀴즈 / 문제의 좋아요, 댓글, 조희수가 모두 삭제되며 이는 사용자 레벨에 영향을 미칩니다.</div>
    </DeleteMsg>
    <CheckPassword onSubmit={handleSubmit(onSubmit)}>
      <InputLayout>
        <div className="inputTitle">
          비밀번호 확인  <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
        </div>
        <input
          {...register("password", {
            required: true
          })}
          type={visible ? "text" : "password"}
          autoComplete="off"
        />
      </InputLayout>
      <InputBtn type="submit" value="확인" disabled={!isValid} />
      {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
    </CheckPassword>
    {delMode && <DeleteBtn />}
  </Container>);
}

export default DeleteContainer;