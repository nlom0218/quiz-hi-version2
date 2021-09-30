import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import AdminComplainDetail from './AdminComplainDetail';
import { ContentItem } from './sharedCss';

const AdminQuestionComplainItem = ({ question, sender, receiver, message }) => {
  const [seeInfo, setSeeInfo] = useState(false)
  const processSender = (str) => {
    const obj = JSON.parse(str)
    const { username } = obj
    return username
  }
  const processReceiver = (str) => {
    const obj = JSON.parse(str)
    const { username } = obj
    return username
  }
  const onCLickId = (id) => {
    window.open(`/detail/question/${id}`, "_blank")
  }
  const onCLickUser = (str) => {
    const obj = JSON.parse(str)
    const { username } = obj
    window.open(`/profile/${username}/info`, "_blank")
  }
  const onClickInfoBtn = () => {
    setSeeInfo(prev => !prev)
  }
  return (<ContentItem>
    <div className="link_btn" onClick={() => onCLickId(question.id)}>{question.id}</div>
    <div className="link_btn" onClick={() => onCLickUser(sender)}>{processSender(sender)}</div>
    <div className="link_btn" onClick={() => onCLickUser(receiver)}>{processReceiver(receiver)}</div>
    <div>{message}</div>
    <div className="detail_content"><FontAwesomeIcon icon={faInfoCircle} onClick={onClickInfoBtn} /></div>
    {seeInfo && <AdminComplainDetail />}
  </ContentItem>);
}

export default AdminQuestionComplainItem;