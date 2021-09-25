import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
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

const DELETE_NOTICE_MUTATION = gql`
  mutation deleteNotice($noticeId: Int!) {
    deleteNotice(noticeId: $noticeId) {
      ok
      error
    }
  }
`

const ChargeNotice = ({ message, info, noticeId }) => {
  const textarea = useRef()
  const [txtHeight, setTxtHeight] = useState(null)
  useEffect(() => {
    setTxtHeight(textarea.current.scrollHeight)
  }, [])
  const history = useHistory()
  const infoArr = JSON.parse(info)
  const chargeInfo = infoArr.map((item) => item.chargeInfo).filter((item) => item)[0]
  const type = infoArr.map((item) => item.type).filter((item) => item)[0]
  const quizQuestionId = infoArr.map((item) => item.id).filter((item) => item)[0]
  const onCompletedDelete = (result) => {
    const { deleteNotice: { ok, error } } = result
    if (ok) {
      window.location.reload()
    }
  }
  const [deleteNotice, { loading: deleteLoading }] = useMutation(DELETE_NOTICE_MUTATION, {
    onCompleted: onCompletedDelete
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
  const onClickNavBtn = () => {
    history.push(`/detail/${type}/${quizQuestionId}`)
  }
  return (<DetailNoticeContainer>
    <Contents>
      <div>{message}</div>
      <InfoTextarea
        value={chargeInfo}
        cols={20}
        rows={1}
        txtHeight={txtHeight}
        readOnly="readOnly"
        ref={textarea}
      ></InfoTextarea>
    </Contents>
    <ActionBtn>
      <div onClick={onClickNavBtn}>{type === "quiz" ? "퀴즈" : "문제"} 바로가기</div>
      <div onClick={onClickDeleteBtn}>삭제하기</div>
    </ActionBtn>
  </DetailNoticeContainer>);
}

export default ChargeNotice;