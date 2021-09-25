import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.li`
  padding: 17px 20px;
  line-height: 160%;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: 1fr 3fr 4fr 3fr 1fr 1fr;
  column-gap: 10px;
  :hover {
    background-color: ${props => props.theme.grayColor};
  }
`

const EditBtn = styled.div`
  justify-self: flex-end;
  cursor: pointer;
`

const UserItem = ({ id, username, nickname, email, type }) => {
  const processType = () => {
    if (type === "teacher") {
      return "선생님"
    } else if (type === "nomal") {
      return "일반"
    } else {
      return "학생"
    }
  }
  return (<Container>
    <div>{id}</div>
    <div>{username}</div>
    <div>{email}</div>
    <div>{nickname}</div>
    <div>{processType()}</div>
    <EditBtn><FontAwesomeIcon icon={faCog} /></EditBtn>
  </Container>);
}

export default UserItem;