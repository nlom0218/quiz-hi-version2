import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import AdminQuestionComplain from './AdminQuestionComplain';
import AdminQuizComplain from './AdminQuizComplain';
import { SetTypeBtn, Type } from './sharedCss';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  margin-bottom: 60px;
  .topContent {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: flex-end;
  }
`

const AdminComplain = () => {
  const [seeType, setSeeType] = useState(undefined)
  const onClickType = (type) => {
    setSeeType(type)
  }

  return (
    <Container>
      <SetTypeBtn>
        <Type
          selected={seeType === "quiz"}
          onClick={() => onClickType("quiz")}
        >퀴즈</Type>
        <Type
          selected={seeType === "question"}
          onClick={() => onClickType("question")}
        >문제</Type>
      </SetTypeBtn>
      {seeType === "quiz" && <AdminQuizComplain />}
      {seeType === "question" && <AdminQuestionComplain />}
    </Container>);
}

export default AdminComplain;