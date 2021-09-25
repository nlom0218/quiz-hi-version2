import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import DeleteAllStudentAccount from './DeleteAllStudentAccount';
import Homework from './Homework';
import SharedStudent from './SharedStudent';
import StudentList from './StudentList';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  .delAccount {
    color: tomato;
  }
`

const Title = styled.div`
  align-self: flex-start;
  font-weight: 600;
`

const DivisionLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgb(200, 200, 200, 0.6);
  transition: background-color 1s ease;
`

const ManagemnetStudent = ({ students, id, quizScore: teacherQuizScore, type, username }) => {
  const history = useHistory()
  useEffect(() => {
    if (type === "student") {
      history.push(`/profile/${username}/info`)
    }
  })
  return (<Container>
    <Wrapper>
      <Title>학생 목록</Title>
      <StudentList students={students} id={id} teacherUsername={username} />
    </Wrapper>
    {students.length !== 0 &&
      <React.Fragment>
        <DivisionLine></DivisionLine>
        <Wrapper>
          <Title>숙제 목록</Title>
          <Homework students={students} id={id} type={type} />
        </Wrapper>
        <DivisionLine></DivisionLine>
        <Wrapper>
          <Title>학생 공유</Title>
          <SharedStudent students={students} userId={id} type={type} username={username} />
        </Wrapper>
        <DivisionLine></DivisionLine>
        <Wrapper>
          <Title className="delAccount">학생 계정 삭제</Title>
          <DeleteAllStudentAccount />
        </Wrapper>
      </React.Fragment>
    }
  </Container>);
}

export default ManagemnetStudent;