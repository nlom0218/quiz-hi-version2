import React, { useState } from 'react';
import styled from 'styled-components';
import NoticeList from './NoticeList';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  .delAccount {
    color: tomato;
  }
`

const Title = styled.div`
  align-self: flex-start;
  font-weight: 600;
`

const Notice = ({ notice, id }) => {
  return (<Container>
    <Wrapper>
      <Title>알림 목록</Title>
      <NoticeList notice={notice} userId={id} />
    </Wrapper>
  </Container>);
}

export default Notice;