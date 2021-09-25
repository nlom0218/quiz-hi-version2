import React, { useState } from 'react';
import styled from 'styled-components';
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCreatedDay } from '../../../sharedFn';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import SharedStudentNotice from './SharedStudentNotice';
import { fadeIn } from '../../../animation/fade';
import EditNotice from './EditNotice';
import ChargeNotice from './ChargeNotice';

const SNoticeItem = styled.div`
  :not(:last-child) {
    border-bottom: 1px solid rgb(200, 200, 200, 0.6);
  }
  padding: 20px 20px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
  background-color: ${props => props.theme.boxColor};
  transition: 1s ease background-color;
  :hover {
    background-color: ${props => props.theme.grayColor};
  }
  :hover textarea {
    background-color: ${props => props.theme.grayColor};;
  }
  svg {
    justify-self: flex-end;
    cursor: pointer;
  }
`

const CreatedAt = styled.div``

const Sender = styled.div``

const Type = styled.div``

const DetailNotice = styled.div`
  grid-column: 1 / -1;
  animation: ${fadeIn} 0.6s ease;
`

const CONFIRM_NOTICE_MUTATION = gql`
  mutation confirmNotice($noticeId: Int!, $userId: Int!) {
    confirmNotice(noticeId: $noticeId, userId: $userId) {
      ok
      error
    } 
  }
`

const NoticeItem = ({ createdAt, sender, type, confirm, userId, id, message, info }) => {
  const [seeDetail, setSeeDetail] = useState(false)
  const processType = (type) => {
    if (type === "sharedStudent") {
      return "학생 공유"
    } else if (type === "editNotice") {
      return "수정 알림"
    } else if (type === "chargeNotice") {
      return "신고 접수 알림"
    }
  }
  const update = (cache, result) => {
    const { data: { confirmNotice: { ok } } } = result
    if (ok) {
      const NoticeId = `Notice:${id}`
      cache.modify({
        id: NoticeId,
        fields: {
          confirm() {
            return true
          }
        }
      })
    }
  }
  const [confirmNotice, { loading }] = useMutation(CONFIRM_NOTICE_MUTATION, {
    update
  })
  const onClickConfirmBtn = (noticeId, confirm) => {
    if (confirm) {
      setSeeDetail(prev => !prev)
      return
    }
    if (loading) {
      return
    }
    setSeeDetail(true)
    confirmNotice({
      variables: {
        noticeId,
        userId
      }
    })
  }
  return (<SNoticeItem>
    <CreatedAt>{getCreatedDay(createdAt)}</CreatedAt>
    {type === "chargeNotice" ?
      <Sender>신고자는 익명입니다.</Sender>
      :
      <Sender>{sender.length > 10 ? `${sender.substring(0, 10)}...` : sender}</Sender>}
    <Type>{processType(type)}</Type>
    <FontAwesomeIcon icon={confirm ? faEnvelopeOpen : faEnvelope} onClick={() => onClickConfirmBtn(id, confirm)} />
    {seeDetail && <DetailNotice>
      {type === "sharedStudent" && <SharedStudentNotice userId={userId} message={message} info={info} noticeId={id} />}
      {type === "editNotice" && <EditNotice userId={userId} message={message} info={info} noticeId={id} />}
      {type === "chargeNotice" && <ChargeNotice userId={userId} message={message} info={info} noticeId={id} />}
    </DetailNotice>}
  </SNoticeItem>);
}

export default NoticeItem;