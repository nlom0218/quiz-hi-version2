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

const DISCONNECT_SHARED_STUDENT_MUTATION = gql`
  mutation disconnectSharedStudent($userId: Int!, $studentId: String!) {
    disconnectSharedStudent(userId: $userId, studentId: $studentId) {
      ok
      error
    }
  }
`

const SharedStudentDelete = ({ sharedStudents, userId }) => {
  const [deleteStudent, setDeleteStudent] = useState([])
  const onCompleted = (result) => {
    const { disconnectSharedStudent: { ok, error } } = result
    if (ok) {
      window.alert("선택된 학생을 학생 목록에서 삭제되었습니다.")
      window.location.reload()
    }
  }
  const [disconnectSharedStudent, { loading }] = useMutation(DISCONNECT_SHARED_STUDENT_MUTATION, {
    onCompleted
  })
  const { handleSubmit } = useForm({
    mode: "onChange"
  })
  const onClickCheckBox = (studentId) => {
    let newDeleteStudent = []
    if (deleteStudent.includes(studentId)) {
      newDeleteStudent = deleteStudent.filter((item) => item !== studentId)
    } else {
      newDeleteStudent = [...deleteStudent, studentId]
    }
    setDeleteStudent(newDeleteStudent)
  }
  const processCheckdeleteStudent = (studentId) => {
    if (deleteStudent.includes(studentId)) {
      return true
    } else {
      return false
    }
  }
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    disconnectSharedStudent({
      variables: {
        userId,
        studentId: JSON.stringify(deleteStudent)
      }
    })
  }
  const onClickSeleteAllBtn = () => {
    const sharedStudentsIdArr = sharedStudents.map((item) => item.id)
    const confirm = sharedStudentsIdArr.map((item) => {
      if (deleteStudent.includes(item)) {
        return item
      } else {
        return undefined
      }
    })
    if (confirm.includes(undefined)) {
      return setDeleteStudent(sharedStudentsIdArr)
    } else {
      return setDeleteStudent([])
    }
  }
  const processCheckAllStudent = () => {
    const sharedStudentsIdArr = sharedStudents.map((item) => item.id)
    const confirm = sharedStudentsIdArr.map((item) => {
      if (deleteStudent.includes(item)) {
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
      <div className="delMsg">∙ 공유 받은 학생 계정을 삭제합니다</div>
      <div className="delMsg">∙ 삭제되는 학생들의 레벨(점수)에는 영향이 없습니다.</div>
    </DeleteMsg>
    <EditPageItem style={{ alignItems: "flex-start" }}>
      <div>학생 계정 선택</div>
      {sharedStudents.length === 0 ? <div style={{ color: "tomato" }}>학생이 없습니다.</div> : <SharedStudnetBox>
        <SeleteAll>모두 선택하기
          <FontAwesomeIcon icon={processCheckAllStudent() ? faCheckSquare : faSquare}
            onClick={onClickSeleteAllBtn} />
        </SeleteAll>
        <SharedStudentList>
          {sharedStudents.map((item, index) => {
            return <SharedStudentItem key={index}>
              <SharedStudentNickname>{item.nickname.length > 8 ? `${item.nickname.substring(0, 8)}...` : item.nickname}</SharedStudentNickname>
              <FontAwesomeIcon icon={processCheckdeleteStudent(item.id) ? faCheckSquare : faSquare}
                onClick={() => onClickCheckBox(item.id)} />
            </SharedStudentItem>
          })}
        </SharedStudentList>
      </SharedStudnetBox>}
    </EditPageItem>
    <SharedBtn type="submit" value="삭제하기" disabled={deleteStudent.length === 0} />
  </EditPageForm>);
}

export default SharedStudentDelete;