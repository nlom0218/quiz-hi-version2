import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';
import { compare } from '../../sharedFn';

const Container = styled.div`
  animation: ${fadeIn} 0.6s ease;
  padding-top: 30px;
  border-top: rgb(200, 200, 200, 0.6) 1px solid;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
`

const CallQuizInfo = styled.div``

const SeleteAllBtn = styled.div`
  justify-self: flex-end;
  svg {
    cursor: pointer;
  }
`

const StudentList = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
`

const StudentItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
  display: grid;
  grid-template-columns: 1fr auto;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  svg {
    cursor: pointer;
  }
`

const StudentListEven = styled.div`
  align-self: flex-start;
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
`

const StudentInfo = styled.div``

const NonExistStudents = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  a {
    background-color: rgb(255, 165, 0, 0.4);
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color linear 0.5s;
    :hover {
      background-color: rgb(255, 165, 0, 0.8);
    }
  }
`

const Msg = styled.div`
  color: tomato;
`

const SelectStudents = ({ msg, setStduents, students }) => {
  const user = useUser()
  const onClickSelectBtn = (nickname, id) => {
    const exist = students.some((item) => item.id === id)
    let newStudents = []
    if (!exist) {
      newStudents = [...students, { nickname, id, pass: true, score: 0 }]
        .sort(compare("id"))
        .map((item, index) => { return { ...item, order: index + 1 } })
    } else {
      newStudents = students.filter((item) => item.id !== id)
        .sort(compare("id"))
        .map((item, index) => { return { ...item, order: index + 1 } })
    }
    setStduents(newStudents)
  }
  const checkStudent = (id) => {
    const exist = students.some((item) => item.id === id)
    if (exist) {
      return true
    } else {
      return false
    }
  }
  const onClickSelectAllBtn = () => {
    const existAll = user.students.map((item) => {
      const studentsId = students.map((item) => item.id)
      if (studentsId.includes(item.id)) {
        return true
      } else {
        return false
      }
    }).every((item) => item === true)
    if (existAll) {
      setStduents([])
    } else {
      const newStudents = user.students.map((item) => {
        return {
          nickname: item.nickname,
          id: item.id,
          pass: true,
          score: 0
        }
      })
        .sort(compare("id"))
        .map((item, index) => { return { ...item, order: index + 1 } })
      setStduents(newStudents)
    }
  }
  const checkStudentAll = () => {
    const existAll = user.students.map((item) => {
      const studentsId = students.map((item) => item.id)
      if (studentsId.includes(item.id)) {
        return true
      } else {
        return false
      }
    }).every((item) => item === true)
    if (existAll) {
      return true
    } else {
      return false
    }
  }
  return (<Container>
    {user.students.length !== 0 ?
      <React.Fragment>
        <CallQuizInfo>{msg}</CallQuizInfo>
        <SeleteAllBtn>모두 선택하기 <FontAwesomeIcon icon={checkStudentAll() ? faCheckSquare : faSquare} onClick={onClickSelectAllBtn} /></SeleteAllBtn>
        <StudentList>
          {user.students.map((item, index) => {
            if ((index + 1) % 2 === 0) {
              return
            } else {
              return <StudentItem key={index}>
                <StudentInfo>
                  {index + 1}번 {item.nickname.length > 12 ? `${item.nickname.substring(0, 12)}...` : item.nickname}
                </StudentInfo>
                <FontAwesomeIcon icon={checkStudent(item.id) ? faCheckSquare : faSquare} onClick={() => onClickSelectBtn(item.nickname, item.id)} />
              </StudentItem>
            }
          })}
        </StudentList>
        <StudentListEven>
          {user.students.map((item, index) => {
            if ((index + 1) % 2 === 1) {
              return
            } else {
              return <StudentItem key={index}>
                <StudentInfo>
                  {index + 1}번 {item.nickname.length > 12 ? `${item.nickname.substring(0, 12)}...` : item.nickname}
                </StudentInfo>
                <FontAwesomeIcon icon={checkStudent(item.id) ? faCheckSquare : faSquare} onClick={() => onClickSelectBtn(item.nickname, item.id)} />
              </StudentItem>
            }
          })}
        </StudentListEven>
      </React.Fragment>
      :
      <NonExistStudents>
        <Msg>생성된 학생 계정이 없습니다.</Msg>
        <Link to={`/profile/${user.username}/student`}>계정 생성하러 가기</Link>
      </NonExistStudents>
    }
  </Container>);
}

export default SelectStudents;