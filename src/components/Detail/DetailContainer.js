import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import SendEditDChargeMsg from './SendEditChargeMsg';
import useUser from '../../hooks/useUser';

const SDetailContainer = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
`

const DetailContainer = ({ children, user, id, title }) => {
  const loggedInUser = useUser()
  return (<SDetailContainer>
    {children}
    {user.id !== loggedInUser.id && <SendEditDChargeMsg user={user} id={id} title={title} />}
  </SDetailContainer>);
}

export default DetailContainer;