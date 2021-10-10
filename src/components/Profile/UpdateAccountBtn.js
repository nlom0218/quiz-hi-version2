import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 10px;
  align-items: center;
  div {
    text-align: center;
  }
`

const UpdateBtn = styled.div`
  padding: 10px 20px;
  background-color: rgb(255, 165, 0, 0.4);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.6s ease;
  :hover {
    background-color: rgb(255, 165, 0, 0.8);
  }
`

const UpdateAccountBtn = ({ email, userId }) => {
  console.log(email, userId);
  return (<Container>
    <div>이메일 인증에 성공하였습니다.</div>
    <UpdateBtn>계정 업데이트</UpdateBtn>
  </Container>);
}

export default UpdateAccountBtn;