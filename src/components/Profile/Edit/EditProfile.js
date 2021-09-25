import React from 'react';
import styled from 'styled-components';
import DeleteAccount from './DeleteAccount';
import EditBasicInfo from './EditBasicInfo';
import EditPrivatePage from './EditPrivatePage';
import EidtPassword from './EidtPassword';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 360px 1fr;
  row-gap: 60px;
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

const EditProfile = ({ nickname, caption, avatarURL, id, personalPage, type }) => {
  return (<Container>
    <Title>기본정보 수정</Title>
    <EditBasicInfo nickname={nickname} caption={caption} avatarURL={avatarURL} id={id} />
    <DivisionLine></DivisionLine>
    <Title>개인 홈페이지 수정</Title>
    <EditPrivatePage personalPage={personalPage} id={id} />
    <DivisionLine></DivisionLine>
    <Title>비밀번호 수정</Title>
    <EidtPassword />
    {type !== "student" && <React.Fragment>
      <DivisionLine></DivisionLine>
      <Title className="delAccount">계정 삭제</Title>
      <DeleteAccount />
    </React.Fragment>}
  </Container>);
}

export default EditProfile;