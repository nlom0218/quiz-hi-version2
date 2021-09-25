import React, { useState } from 'react';
import styled from 'styled-components';
import EditInput from '../Edit/EditInput';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

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
  grid-template-columns: 1fr 2fr;
  column-gap: 20px;
`

const SharedBtn = styled.input`
  text-align: center;
  background-color: rgb(255, 165, 0, 0.6);
  color: ${props => props.theme.fontColor};
  padding: 10px 20px;
  border-radius: 5px;
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: opacity 0.4s linear;
  cursor: pointer;
`

const SharedStudnetBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const SeleteAll = styled.div`
  justify-self: flex-end;
  margin-right: 20px;
  svg {
    cursor: pointer;
    margin-left: 10px;
  }
`

const SharedStudentList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgb(200, 200, 200, 0.2);
  column-gap: 1px;
  row-gap: 1px;
  border: 1px solid rgb(200, 200, 200, 0.2);
`

const SharedStudentItem = styled.div`
  padding: 10px 20px;
  background-color: ${props => props.theme.boxColor}; 
  display: grid;
  grid-template-columns: 1fr auto;
  svg {
    cursor: pointer;
  }
`


const SharedStudentNickname = styled.div`

`

const ErrMsg = styled.div`
  text-align: center;
  color: tomato;
`

const SEND_NOTICE_MUTATION = gql`
  mutation sendNotice($info: String!, $type: String!, $receiverEmail: String) {
    sendNotice(info: $info, type: $type, receiverEmail: $receiverEmail) {
      ok
      error
    }
  }
`

const SharedStudnetSend = ({ userStudents }) => {
  const [sendStudent, setSendStudent] = useState([])
  const [errMsg, setErrMsg] = useState(null)
  const { register, formState: { isValid }, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { sendNotice: { ok, error } } = result
    if (!ok) {
      setErrMsg(error)
    }
    if (ok) {
      window.alert("학생 목록이 공유되었습니다.")
      setValue("receiverEmail", "")
      setErrMsg(null)
      setSendStudent([])
    }
  }
  const [sendNotice, { loading }] = useMutation(SEND_NOTICE_MUTATION, {
    onCompleted
  })
  const onClickCheckBox = (studentId) => {
    let newSendStudent = []
    if (sendStudent.includes(studentId)) {
      newSendStudent = sendStudent.filter((item) => item !== studentId)
    } else {
      newSendStudent = [...sendStudent, studentId]
    }
    setSendStudent(newSendStudent)
  }
  const processCheckSendStudent = (studentId) => {
    if (sendStudent.includes(studentId)) {
      return true
    } else {
      return false
    }
  }
  const onSubmit = (data) => {
    const { receiverEmail } = data
    if (loading) {
      return
    }
    sendNotice({
      variables: {
        info: JSON.stringify(sendStudent),
        type: "sharedStudent",
        receiverEmail
      }
    })
  }
  const onClickSeleteAllBtn = () => {
    const userStudentsIdArr = userStudents.map((item) => item.id)
    const confirm = userStudentsIdArr.map((item) => {
      if (sendStudent.includes(item)) {
        return item
      } else {
        return undefined
      }
    })
    if (confirm.includes(undefined)) {
      return setSendStudent(userStudentsIdArr)
    } else {
      return setSendStudent([])
    }
  }
  const processCheckAllStudent = () => {
    const userStudentsIdArr = userStudents.map((item) => item.id)
    const confirm = userStudentsIdArr.map((item) => {
      if (sendStudent.includes(item)) {
        return item
      } else {
        return undefined
      }
    })
    if (confirm.includes(undefined)) {
      return false
    } else {
      return true
    }
  }
  processCheckAllStudent()
  return (<EditPageForm onSubmit={handleSubmit(onSubmit)}>
    <DeleteMsg>
      <div className="delMsg">∙ 자신이 생성한 학생 계정을 다른 선생님과 공유합니다.</div>
      <div className="delMsg">∙ 공유받은 선생님은 선택한 학생 계정으로 퀴즈 진행, 내보내기가 가능해 집니다.</div>
    </DeleteMsg>
    <EditPageItem style={{ alignItems: "flex-start" }}>
      <div>학생 계정 선택</div>
      {userStudents.length === 0 ? <div style={{ color: "tomato" }}>학생이 없습니다.</div> : <SharedStudnetBox>
        <SeleteAll>모두 선택하기
          <FontAwesomeIcon icon={processCheckAllStudent() ? faCheckSquare : faSquare}
            onClick={onClickSeleteAllBtn} />
        </SeleteAll>
        <SharedStudentList>
          {userStudents.map((item, index) => {
            return <SharedStudentItem key={index}>
              <SharedStudentNickname>{item.nickname.length > 8 ? `${item.nickname.substring(0, 8)}...` : item.nickname}</SharedStudentNickname>
              <FontAwesomeIcon icon={processCheckSendStudent(item.id) ? faCheckSquare : faSquare}
                onClick={() => onClickCheckBox(item.id)} />
            </SharedStudentItem>
          })}
        </SharedStudentList>
      </SharedStudnetBox>}
    </EditPageItem>
    <EditPageItem style={{ alignItems: "center" }}>
      <div>공유 받을 선생님 이메일</div>
      <EditInput
        {...register("receiverEmail", { required: true })}
        type="email"
        autoComplete="off"
      />
    </EditPageItem>
    {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
    <SharedBtn type="submit" value="공유하기" disabled={!isValid || sendStudent.length === 0} />
  </EditPageForm>);
}

export default SharedStudnetSend;