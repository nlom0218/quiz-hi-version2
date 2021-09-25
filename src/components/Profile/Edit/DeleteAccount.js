import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import { logOutUser } from '../../../apollo';
import useUser from '../../../hooks/useUser';
import EditInput from './EditInput';
import EditProfileBox from './EditProfileBox';

const EditPageForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`
const DeleteMsg = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const EditPageItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  column-gap: 20px;
  align-items: center;
`

const DelBtn = styled.input`
  text-align: center;
  background-color: tomato;
  color: #F4F4F4;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: opacity 0.4s linear;
  cursor: pointer;
`

const ErrMsg = styled.div`
  justify-self: center;
  color: tomato;
  animation: ${fadeIn} 0.6s ease;
`

const DELETE_ACCOUNT_MUTATION = gql`
  mutation deleteAccount($username: String!, $password: String!) {
    deleteAccount(username: $username, password: $password) {
      ok
      error
    }
  }
`

const DeleteAccount = () => {
  const history = useHistory()
  const user = useUser()
  const [errMsg, setErrMsg] = useState(undefined)
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { deleteAccount: { ok, error } } = result
    if (ok) {
      history.push("/")
      logOutUser()
    } else {
      setErrMsg(error)
    }
  }
  const [deleteAccount, { loading }] = useMutation(DELETE_ACCOUNT_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { password } = data
    deleteAccount({
      variables: {
        username: user.username,
        password
      }
    })
  }
  return (<EditProfileBox>
    <EditPageForm onSubmit={handleSubmit(onSubmit)}>
      <DeleteMsg>
        <div className="delMsg">∙ 탈퇴한 계정은 다시 복구되지 않습니다.</div>
        <div className="delMsg">∙ 퀴즈, 문제, 게시물, 댓글 등 모두 삭제됩니다.</div>
        <div className="delMsg">∙ 생성된 학생 계정 모두 삭제됩니다.</div>
      </DeleteMsg>
      <EditPageItem>
        <div>비밀번호</div>
        <EditInput
          type="password"
          {...register("password", { required: true })}
          autoComplete="off"
        />
      </EditPageItem>
      {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
      <DelBtn type="submit" value="탈퇴하기" disabled={!isValid} />
    </EditPageForm>
  </EditProfileBox>);
}

export default DeleteAccount;