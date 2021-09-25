import { useMutation } from '@apollo/client';
import { faEye, faEyeSlash, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import EditInput from '../Edit/EditInput';
import SaveBtn from '../Edit/SaveBtn';

const SStudentEditting = styled.form`
  margin: 20px 0px;
  padding: 0px 40px;
  justify-self: stretch;
  grid-column: 1 / -1;
  animation: ${fadeIn} 0.6s ease;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  align-items: center;
  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`

const Button = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 40px;
`

const DelBtn = styled.div`
  align-self: center;
  text-align: center;
  background-color: tomato;
  color: #F4F4F4;
  padding: 10px 40px;
  border-radius: 5px;
  transition: opacity 0.4s linear;
  cursor: pointer;
  svg {
    margin-left: 20px;
  }
`

const SaveMsg = styled.div`
  justify-self: center;
  color: tomato;
  font-weight: 600;
  animation: ${fadeIn} 0.4s linear;
`

const ErrMsg = styled.div`
  grid-column: 1 / -1;
  justify-self: center;
  color: tomato;
  font-weight: 600;
  animation: ${fadeIn} 0.4s linear;
`

const EDIT_STUDENT_PROFILE_MUTATION = gql`
  mutation editStudentProfile($teacherId: Int!, $studentId: Int!, $password: String, $nickname: String, $score: Int) {
    editStudentProfile(teacherId: $teacherId, studentId: $studentId, password: $password, nickname: $nickname, score: $score) {
      ok
      error
    }
  }
`

const DELETE_STUDENT_ACCOUNT_MUTATION = gql`
  mutation deleteStudentAccount($teacherId: Int!, $studentId: Int!) {
    deleteStudentAccount(teacherId: $teacherId, studentId: $studentId) {
      ok
      error
    }
  }
`

const StudentEditting = ({ nickname, teacherId, studentId }) => {
  const [visible, setVisible] = useState(false)
  const [saveMsg, setSaveMsg] = useState(undefined)
  const [errMsg, setErrMsg] = useState(undefined)
  const { register, formState: { isValid }, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname
    }
  })
  const update = (cache, result) => {
    const { data: { editStudentProfile: { ok, error } } } = result
    if (ok) {
      setErrMsg(undefined);
      setValue("score", "")
      const UserId = `User:${studentId}`
      cache.modify({
        id: UserId,
        fields: {
          nickname() { return getValues("nickname") },
        }
      })
      setSaveMsg("학생정보가 수정 되었습니다.\n레벨(점수)는 새로고침하면 바뀝니다.")
    } else if (!ok) {
      setErrMsg(error);
    }
  }
  const [editStudentProfile, { loading }] = useMutation(EDIT_STUDENT_PROFILE_MUTATION, {
    update
  })
  const [deleteStudentAccount, { loading: delLoading }] = useMutation(DELETE_STUDENT_ACCOUNT_MUTATION, {
    onCompleted: () => window.location.reload()
  })
  const onClickDelBtn = () => {
    if (delLoading) {
      return
    }
    if (window.confirm("학생 계정을 삭제합니다. 삭제된 계정은 다시 복구되지 않으며 학생의 모든 정보는 삭제됩니다.")) {
      deleteStudentAccount({
        variables: {
          teacherId,
          studentId,
        }
      })
    } else {
      return
    }
  }
  const onSubmit = (data) => {
    const { nickname, password, score } = data
    if (loading) {
      return
    }
    if (Math.sign(score) === -1) {
      setErrMsg("추가 점수를 양수로 설정해 주세요.");
      return
    }
    editStudentProfile({
      variables: {
        teacherId,
        studentId,
        nickname,
        ...(password !== "" && { password }),
        ...(score && { score: parseInt(score) })
      }
    })
  }
  const onClickEye = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  return (<SStudentEditting onSubmit={handleSubmit(onSubmit)}>
    <Wrapper>
      <div>닉네임</div>
      <EditInput
        {...register("nickname", { required: true })}
        type="text"
        autoComplete="off"
      />
    </Wrapper>
    <Wrapper>
      <div>추가 점수 부여</div>
      <EditInput
        {...register("score")}
        type="number"
        autoComplete="off"
      />
    </Wrapper>
    <Wrapper>
      <div>비밀번호 재설정
      <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
      </div>
      <EditInput
        {...register("password")}
        type={visible ? "text" : "password"}
        autoComplete="off"
      />
    </Wrapper>
    <Button>
      <SaveBtn type="submit" value="저장하기" disabled={!isValid} />
      <DelBtn onClick={onClickDelBtn}>계정 삭제하기</DelBtn>
    </Button>
    {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
    {saveMsg && <SaveMsg>{saveMsg}</SaveMsg>}
  </SStudentEditting>);
}

export default StudentEditting;