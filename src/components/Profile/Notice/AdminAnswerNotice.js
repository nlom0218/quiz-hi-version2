import React from 'react';
import styled from 'styled-components';
import { ActionBtn } from './ActionBtn';
import DetailNoticeContainer from './DetailNoticeContainer';

const Contents = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const InfoTextarea = styled.textarea`
  width: 100%;
  height: ${props => props.txtHeight}px;
  resize: none;
  border: none;
  font-size: 16px;
  padding: 0px;
  color: ${props => props.theme.fontColor};
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease, color 1s ease;
  :focus {
    outline: none;
  }
`

const AdminAnswerNotice = ({ message, info, noticeId }) => {
  const onClickDeleteBtn = () => {
    // if (deleteLoading) {
    //   return
    // }
    // window.alert("알림이 삭제됩니다.")
    // deleteNotice({
    //   variables: {
    //     noticeId
    //   }
    // })
  }
  return (<DetailNoticeContainer>
    <Contents>
      <div>{message}</div>
      <InfoTextarea
      // value={chargeInfo}
      // cols={20}
      // rows={1}
      // txtHeight={txtHeight}
      // readOnly="readOnly"
      // ref={textarea}
      ></InfoTextarea>
    </Contents>
    <ActionBtn>
      <div onClick={onClickDeleteBtn}>삭제하기</div>
    </ActionBtn>
  </DetailNoticeContainer>);
}

export default AdminAnswerNotice;