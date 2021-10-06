import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import LevelStep from '../LevelStep';
import LinkBtn from '../LinkBtn';
import HomeLayout from './HomeLayout';

const Box = styled.div`
  grid-row: 2 / 3;
  background-color: rgb(77, 242, 78, 0.2);
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 24px;
  margin-bottom: 40px;
`

const SendMsg = () => {
  const user = useUser()
  return (<HomeLayout
    className="sendMsg"
    layout="sendMsg"
    title="Message"
    msg="Send message to admin"
    left={false}
  >
    <Box>
      <div>
        <FontAwesomeIcon icon={faEnvelope} /> 관리자에게 메시지 보내기 기능이 곧 업데이트 됩니다
      </div>
    </Box>
  </HomeLayout>);
}

export default SendMsg;