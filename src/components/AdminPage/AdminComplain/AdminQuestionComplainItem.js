import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import AdminComplainDetail from './AdminComplainDetail';
import { ContentItem } from '../sharedCss';
import AdaminQuestionDetail from './AdaminQuestionDetail';

const AdminQuestionComplainItem = ({ id, question, QuestionComplain, user: { username }, complain, deleteDay }) => {
  const [seeInfo, setSeeInfo] = useState(false)
  const onCLickQuestion = () => {
    window.open(`/detail/question/${id}`, "_blank")
  }
  const onCLickUser = () => {
    window.open(`/profile/${username}/info`, "_blank")
  }
  const onClickInfoBtn = () => {
    setSeeInfo(prev => !prev)
  }
  return (<ContentItem>
    <div>{id}</div>
    <div className="link_btn" onClick={onCLickUser}>{username}</div>
    <div className="link_btn" onClick={onCLickQuestion}>{question}</div>
    <div className="detail_content"><FontAwesomeIcon icon={faInfoCircle} onClick={onClickInfoBtn} /></div>
    {seeInfo && <AdaminQuestionDetail type="question" QuestionComplain={QuestionComplain} />}
  </ContentItem>);
}

export default AdminQuestionComplainItem;