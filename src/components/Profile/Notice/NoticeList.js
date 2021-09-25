import React, { useState } from 'react';
import styled from 'styled-components';
import NoticeItem from './NoticeItem';

const Container = styled.div`
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  transition: border 1s ease;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const ContentsBox = styled.div`
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  column-gap: 20px;
  font-weight: 600;
  border-right: 1px solid rgb(200, 200, 200, 0.6);
  border-left: 1px solid rgb(200, 200, 200, 0.6);
  border-top: 1px solid rgb(200, 200, 200, 0.6);
  background-color: rgb(200, 200, 200, 0.2);
`

const SNoticeList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid rgb(200, 200, 200, 0.6);
`

const Msg = styled.div`
  color: tomato;
`

const NoticeList = ({ notice, userId }) => {
  return (<Container>
    {notice.length === 0 ? <Msg>알림이 없습니다.</Msg> :
      <React.Fragment>
        <ContentsBox>
          <div>받은 날짜</div>
          <div>보낸이(닉네임)</div>
          <div>알림 주제</div>
          <div style={{ justifySelf: "flex-end" }}>확인</div>
        </ContentsBox>
        <SNoticeList>
          {notice?.map((item, index) => {
            return <NoticeItem key={index} {...item} userId={userId} />
          })}
        </SNoticeList>
      </React.Fragment>
    }
  </Container>
  );
}

export default NoticeList;