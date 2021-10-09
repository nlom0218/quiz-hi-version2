import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import HomeLayout from './HomeLayout';

const Box = styled.div`
  padding: 60px;
  grid-row: 2 / 3;
  background-color: rgb(77, 242, 78, 0.2);
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 100px;
  margin-bottom: 40px;
`

const SendMsgInfo = styled.div`
  font-size: 18px;
  display: grid;
  row-gap: 20px;
`

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  padding: 20px 20px;
  color: ${props => props.theme.fontColor};
  background-color: rgb(77, 242, 78, 0.4);
  transition: box-shadow 0.4s linear, background-color 1s ease, color 1s ease;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    outline: none;
  }
`

const MsgForm = styled.form`
  display: grid;
  input {
    color: ${props => props.theme.fontColor};
    justify-self: flex-end;
    cursor: pointer;
    padding: 10px 20px;
    background-color: rgb(77, 242, 78, 0.4);
    transition: background-color 1s ease, color 1s ease;
    border-radius: 5px;
    :hover {
      background-color: rgb(77, 242, 78, 0.6);
    }
  }
  row-gap: 20px;
`

const SendMsg = () => {
  const user = useUser()
  const { register } = useForm({
    mode: "onChange"
  })
  return (<HomeLayout
    className="sendMsg"
    layout="sendMsg"
    title="Message"
    msg="Send message to admin"
    left={false}
  >
    <Box>
      <SendMsgInfo>
        <div><FontAwesomeIcon icon={faCheck} /> 건의사항이 있으신가요?</div>
        <div><FontAwesomeIcon icon={faCheck} /> 원하는 기능이 있으신가요?</div>
        <div><FontAwesomeIcon icon={faCheck} /> 오류를 발견하셨나요?</div>
        <div><FontAwesomeIcon icon={faCheck} /> 궁금하신 내용이 있으신가요?</div>
        <div style={{ fontWeight: "600" }}>언제든지 메시지를 보내주세요!</div>
      </SendMsgInfo>
      <MsgForm>
        <Textarea
          cols={20}
          rows={8}
          {...register("question", {
            required: true
          })}
        ></Textarea >
        <input type="submit" value="메시지 보내기" />
      </MsgForm>
    </Box>
  </HomeLayout>);
}

export default SendMsg;