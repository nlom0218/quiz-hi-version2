import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import { logOutUser } from '../../../apollo';
import useUser from '../../../hooks/useUser';
import EditInput from '../Edit/EditInput';
import EditProfileBox from '../Edit/EditProfileBox';

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

const DELETE_ALL_STUDENT_ACCOUNT_MUTATION = gql`
  mutation DeleteAllStudentAccountMutation($username: String!, $password: String!) {
    deleteAllStudentAccount(username: $username, password: $password) {
      ok
      error
    }
  }
`

const DeleteAllStudentAccount = () => {
  const user = useUser()
  const [errMsg, setErrMsg] = useState(undefined)
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { deleteAllStudentAccount: { ok, error } } = result
    if (ok) {
      window.location.reload()
    } else {
      setErrMsg(error)
    }
  }
  const [deleteAllStudentAccount, { loading }] = useMutation(DELETE_ALL_STUDENT_ACCOUNT_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { password } = data
    deleteAllStudentAccount({
      variables: {
        username: user.username,
        password
      }
    })
  }
  return (<EditProfileBox>
    <EditPageForm onSubmit={handleSubmit(onSubmit)}>
      <DeleteMsg>
        <div className="delMsg">∙ 자신이 생성한 학생 계정을 모두 일괄 삭제합니다.</div>
        <div className="delMsg">∙ 학생을 다른 선생님과 공유했을 경우 해당 선생님의 계정에서도 학생 삭제됩니다.</div>
        <div className="delMsg">∙ 삭제한 학생 계정은 다시 복구되지 않습니다.</div>
        <div className="delMsg">∙ 학생 계정의 퀴즈 점수가 모두 삭제됩니다.</div>
        <div className="delMsg">∙ 생성된 숙제는 모두 삭제되며 복구되지 않습니다.</div>
      </DeleteMsg>
      <EditPageItem>
        <div>선생님 계정 비밀번호</div>
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

export default DeleteAllStudentAccount;