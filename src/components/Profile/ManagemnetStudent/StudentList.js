import React, { useState } from 'react';
import styled from 'styled-components';
import { compare } from '../../../sharedFn';
import EditProfileBox from '../Edit/EditProfileBox';
import CreateStudents from './CreateStudents';
import StudentItem from './StudentItem';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
`

const ListMsg = styled.div`
  /* align-self: flex-end; */
`

const ActionStudentsBtn = styled.div`
  justify-self: flex-end;
  padding: 10px 20px;
  background-color: rgb(255, 165, 0, 0.4);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color linear 0.5s;
  :hover {
    background-color: rgb(255, 165, 0, 0.8);
  }
`

const SStudentList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid rgb(200, 200, 200, 0.8);
`

const StudentInfo = styled.div`
  padding: 13px 15px;
  grid-column: 1 / -1;
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
  display: grid;
  grid-template-columns: 60px 200px 220px auto 1fr;
  column-gap: 20px;
  justify-items: flex-start;
  align-items: center;
  font-weight: 600;
  .studentEdit {
    justify-self: flex-end;
  }
`

const TotalStudentNum = styled.div`
  margin-bottom: 20px;
  svg {
    margin-right: 10px;
  }
`

const StudentList = ({ students, id, teacherUsername }) => {
  const [createStudents, setCreateStudents] = useState(false)
  const onClickCreateStudents = () => {
    setCreateStudents(prev => !prev)
  }
  return (
    <EditProfileBox>
      {students.length === 0 ?
        <Wrapper>
          <ListMsg>생성된 학생이 없습니다. 학생 계졍을 생성하려면 아래의 버튼을 눌러 다음 단계를 진행하세요.</ListMsg>
          <ActionStudentsBtn onClick={onClickCreateStudents}>학생 계정 생성하기</ActionStudentsBtn>
          {createStudents && <CreateStudents id={id} students={students} />}
        </Wrapper>
        :
        <React.Fragment>
          {/* <TotalStudentNum><FontAwesomeIcon icon={faUsers} />{students.length}명의 학생</TotalStudentNum>  */}
          <SStudentList>
            <StudentInfo>
              <div>번호</div>
              <div>아이디</div>
              <div>이름(닉네임)</div>
              <div>레벨(점수)</div>
              <div className="studentEdit">수정</div>
            </StudentInfo>
            {students.map((item, index) => {
              return <StudentItem {...item} key={index} index={index} teacherId={id} teacherUsername={teacherUsername} />
            })}
          </SStudentList>
          <Wrapper>
            <ActionStudentsBtn style={{ marginTop: "20px" }} onClick={onClickCreateStudents}>학생 계정 추가하기</ActionStudentsBtn>
            {createStudents && <CreateStudents id={id} students={students} />}
          </Wrapper>
        </React.Fragment>
      }
    </EditProfileBox>);
}

export default StudentList;