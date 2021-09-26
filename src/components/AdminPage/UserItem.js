import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import ChangeUserType from './ChangeUserType';

const Container = styled.li`
  padding: 17px 20px;
  line-height: 160%;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: 1fr 3fr 4fr 3fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 20px;
  :hover {
    background-color: ${props => props.theme.grayColor};
  }
`

const EditBtn = styled.div`
  justify-self: flex-end;
  cursor: pointer;
`

const EditBox = styled.div`
  animation: ${fadeIn} 0.6s ease;
  margin-left: 80px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`


const UserItem = ({ id, username, nickname, email, type }) => {
  const [editMode, setEditMode] = useState(false)
  const processType = () => {
    if (type === "teacher") {
      return "선생님"
    } else if (type === "nomal") {
      return "일반"
    } else {
      return "학생"
    }
  }
  const onClickEdit = () => {
    setEditMode(prev => !prev)
  }
  return (<Container>
    <div>{id}</div>
    <div>{username}</div>
    <div>{email}</div>
    <div>{nickname}</div>
    <div>{processType()}</div>
    <EditBtn><FontAwesomeIcon icon={faCog} onClick={onClickEdit} /></EditBtn>
    {editMode && <EditBox>
      {type === "nomal" && <ChangeUserType username={username} />}
    </EditBox>}
  </Container>);
}

export default UserItem;