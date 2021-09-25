import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import EditInput from './EditInput';
import EditProfileBox from './EditProfileBox';
import SaveBtn from './SaveBtn';

const EditPageForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const EditPageItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  column-gap: 20px;
  align-items: center;
`

const Msg = styled.div`
  justify-self: center;
  color: tomato;
  font-weight: 600;
  animation: ${fadeIn} 0.4s linear;
`

const CHANGE_PASSWORD_MUTATION = gql`
  mutation chagePassword($username: String!, $oldPassword: String!, $newPassword: String!, $newPasswordConfirm: String!) {
    chagePassword(username: $username, oldPassword: $oldPassword, newPassword: $newPassword, newPasswordConfirm: $newPasswordConfirm) {
      ok
      error
    }
  }
`

const EidtPassword = () => {
  const { username } = useParams()
  const [msg, setMsg] = useState(null)
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: 'onChange'
  })
  const onCompleted = (result) => {
    const { chagePassword: { ok, error } } = result
    if (!ok) {
      setMsg(error)
    } else {
      setMsg("비밀번호가 수정 되었습니다.")
    }
  }
  const [chagePassword, { loading }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { oldPassword, newPassword, newPasswordConfirm } = data
    chagePassword({
      variables: {
        username,
        oldPassword,
        newPassword,
        newPasswordConfirm
      }
    })
  }
  return (<EditProfileBox>
    <EditPageForm onSubmit={handleSubmit(onSubmit)}>
      <EditPageItem>
        <div>현재 비밀번호</div>
        <EditInput
          type="password"
          {...register("oldPassword", { required: true })}
          autoComplete="off"
        />
      </EditPageItem>
      <EditPageItem>
        <div>새 비밀번호</div>
        <EditInput
          type="password"
          {...register("newPassword", { required: true })}
          autoComplete="off"
        />
      </EditPageItem>
      <EditPageItem>
        <div>새 비밀번호 확인</div>
        <EditInput
          type="password"
          {...register("newPasswordConfirm", { required: true })}
          autoComplete="off"
        />
      </EditPageItem>
      {msg && <Msg>{msg}</Msg>}
      <SaveBtn type="submit" value="저장하기" disabled={!isValid} />
    </EditPageForm>
  </EditProfileBox>);
}

export default EidtPassword;