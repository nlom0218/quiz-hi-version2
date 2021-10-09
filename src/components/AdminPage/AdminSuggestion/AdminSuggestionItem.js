import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import AdminSuggestionDetail from './AdminSuggestionDetail';

export const Container = styled.div`
  padding: 17px 20px;
  line-height: 160%;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: 2fr 4fr 0.5fr;
  column-gap: 10px;
  row-gap: 20px;
  :hover {
    background-color: ${props => props.theme.grayColor};
  }
`

const AdminSuggestionItem = ({ suggestion, sender, id }) => {
  const [detail, setDetail] = useState(false)
  const onClickUser = () => {
    window.open(`/profile/${sender}/info`, "_blank")
  }
  const onClickDetail = () => {
    setDetail(prev => !prev)
  }
  return (<Container>
    <div onClick={onClickUser} style={{ cursor: "pointer" }}>{sender}</div>
    <div>{suggestion}</div>
    <div className="detail_content"><FontAwesomeIcon icon={faCog} onClick={onClickDetail} /></div>
    {detail && <AdminSuggestionDetail sender={sender} sugId={id} />}
  </Container>);
}

export default AdminSuggestionItem;