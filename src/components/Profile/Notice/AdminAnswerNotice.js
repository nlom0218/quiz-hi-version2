import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DetailNoticeContainer from './DetailNoticeContainer';

const Contents = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const InfoTextarea = styled.textarea`
  width: 100%;
  line-height: 160%;
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

const ActionBtn = styled.div`
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: 1fr;
  div {
    text-align: center;
    color: #efefef;
    font-weight: 600;
    padding: 3px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 1s ease, color 1s ease;
    background-color: tomato;
  }
`

const DELETE_NOTICE_MUTATION = gql`
  mutation deleteNotice($noticeId: Int!) {
    deleteNotice(noticeId: $noticeId) {
      ok
      error
    }
  }
`

const AdminAnswerNotice = ({ message, info, noticeId }) => {
  const textarea = useRef()
  const [txtHeight, setTxtHeight] = useState(null)
  useEffect(() => {
    setTxtHeight(textarea.current.scrollHeight)
  }, [])
  const onCompleted = (result) => {
    const { deleteNotice: { ok, error } } = result
    if (ok) {
      window.location.reload()
    }
  }
  const [deleteNotice, { loading: deleteLoading }] = useMutation(DELETE_NOTICE_MUTATION, {
    onCompleted
  })
  const onClickDeleteBtn = () => {
    if (deleteLoading) {
      return
    }
    window.alert("알림이 삭제됩니다.")
    deleteNotice({
      variables: {
        noticeId
      }
    })
  }
  return (<DetailNoticeContainer>
    <Contents>
      <div>{message}</div>
      <InfoTextarea
        value={info}
        cols={20}
        rows={1}
        txtHeight={txtHeight}
        readOnly="readOnly"
        ref={textarea}
      ></InfoTextarea>
    </Contents>
    <ActionBtn>
      <div onClick={onClickDeleteBtn}>삭제하기</div>
    </ActionBtn>
  </DetailNoticeContainer>);
}

export default AdminAnswerNotice;