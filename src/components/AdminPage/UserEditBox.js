import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import ChangeUserPassword from './ChangeUserPassword';
import ChangeUserType from './ChangeUserType';
import DeleteUser from './DeleteUser';

const EditBox = styled.div`
  animation: ${fadeIn} 0.6s ease;
  margin-left: 80px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const UserEditBox = ({ username, type }) => {
  return (<EditBox>
    {type === "nomal" && <ChangeUserType username={username} />}
    <ChangeUserPassword username={username} />
    <DeleteUser username={username} />
  </EditBox>);
}

export default UserEditBox;