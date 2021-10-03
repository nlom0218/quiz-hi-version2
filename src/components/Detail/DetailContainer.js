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
  const allowSendMsg = () => {
    if (!loggedInUser) {
      return false
    } else {
      if (loggedInUser?.type === "teacher") {
        if (user.id === loggedInUser?.id) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }

  }
  return (<SDetailContainer>
    {children}
    {allowSendMsg() && <SendEditDChargeMsg user={user} id={id} title={title} />}
  </SDetailContainer>);
}

export default DetailContainer;