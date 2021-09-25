import React, { useState } from 'react';
import styled from 'styled-components';
import EditProfileBox from '../Edit/EditProfileBox';
import SharedStudentDelete from './SharedStudentDelete';
import SharedStudnetSend from './SharedStudentSend';

const DivisionLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgb(200, 200, 200, 0.6);
  transition: background-color 1s ease;
  margin: 40px 0px;
`

const SharedStudent = ({ students, username, userId }) => {
  const [userStudents, setUserStudents] = useState(students.filter((item) => item.username.split("_")[0] === username) || [])
  const [sharedStudents, setSharedStudents] = useState(students.filter((item) => item.username.split("_")[0] !== username) || [])
  return (<EditProfileBox>
    <SharedStudnetSend userStudents={userStudents} />
    <DivisionLine></DivisionLine>
    <SharedStudentDelete sharedStudents={sharedStudents} userId={userId} />
  </EditProfileBox>);
}

export default SharedStudent;