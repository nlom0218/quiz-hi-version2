import { faEnvelopeOpenText, faFlag, fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fadeIn } from '../../animation/fade';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const SendMsgLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const SendMsg = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  div {
    cursor: pointer;
  }
`

const EditMsg = styled.div``

const ChargeMsg = styled.div`
  color: tomato;
`

const EditMsgForm = styled.form`
  background-color: ${props => props.theme.boxColor};
  padding: 40px 30px;
  border-radius: 5px;
  animation: ${fadeIn} 0.4s ease;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  transition: background-color 1s ease;
`

const ChargeMsgForm = styled.form`
  background-color: ${props => props.theme.boxColor};
  padding: 40px 30px;
  border-radius: 5px;
  animation: ${fadeIn} 0.4s ease;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  transition: background-color 1s ease;
`

const Msg = styled.div``

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
`

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 20px;
  color: ${props => props.theme.fontColor};
  background-color: rgb(200, 200, 200, 0.2);
  transition: box-shadow 0.4s linear, color 1s ease;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    outline: none;
  }
`

const SubmitBtn = styled.input`
  background-color: ${props => props.value === "신고하기" ? "tomato" : "rgb(255, 165, 0, 0.6)"};
  color: ${props => props.value === "신고하기" ? "#f4f4f4" : "#383838"};
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  transition: opacity 0.6s ease;
  opacity: ${props => props.disabled ? "0.6" : "1"};
  cursor: pointer;
`

const SEND_NOTICE_MUTATION = gql`
  mutation sendNotice($info: String!, $type: String!, $receiverEmail: String) {
    sendNotice(info: $info, type: $type, receiverEmail: $receiverEmail) {
      ok
      error
    }
  }
`

const SendEditDChargeMsg = ({ user: { email }, id, title }) => {
  const [editMsg, setEditMsg] = useState(false)
  const [chargeMsg, setChargeMsg] = useState(false)
  useEffect(() => {
    if (!editMsg && !chargeMsg) {
      return
    }
    window.scrollBy({
      top: 1200,
      behavior: "smooth"
    })
  }, [editMsg, chargeMsg])
  const { register, formState: { isValid }, setValue, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { sendNotice: { ok } } = result
    if (ok) {
      window.alert("요청이 성공적으로 수행되었습니다.")
      setChargeMsg(false)
      setEditMsg(false)
      setValue("chargeInfo", "")
      setValue("editInfo", "")
    }
  }
  const [sendNotice, { loading }] = useMutation(SEND_NOTICE_MUTATION, {
    onCompleted
  })
  const onClickEditMsg = () => {
    setEditMsg(prev => !prev)
    setChargeMsg(false)
    setValue("chargeInfo", "")
  }
  const onClickChargeMsg = () => {
    setChargeMsg(prev => !prev)
    setEditMsg(false)
    setValue("editInfo", "")
  }
  const onSubmitEditMsg = (data) => {
    const { editInfo } = data
    const type = (title ? "quiz" : "question")
    const info = JSON.stringify([{ id }, { editInfo }, { type }])
    const receiverEmail = email
    if (loading) {
      return
    }
    sendNotice({
      variables: {
        info,
        receiverEmail,
        type: "editNotice"
      }
    })
  }
  const onSubmitChargeMsg = (data) => {
    const { chargeInfo } = data
    const type = (title ? "quiz" : "question")
    const info = JSON.stringify([{ id }, { chargeInfo }, { type }])
    const receiverEmail = email
    if (loading) {
      return
    }
    sendNotice({
      variables: {
        info,
        receiverEmail,
        type: "chargeNotice"
      }
    })
  }
  return (<SendMsgLayout>
    <SendMsg>
      <EditMsg onClick={onClickEditMsg}><FontAwesomeIcon icon={faEnvelopeOpenText} /> 메시지 보내기</EditMsg>
      <ChargeMsg onClick={onClickChargeMsg}><FontAwesomeIcon icon={faFlag} /> 신고하기</ChargeMsg>
    </SendMsg>
    {editMsg && <EditMsgForm onSubmit={handleSubmit(onSubmitEditMsg)}>
      <Msg>• 퀴즈 / 문제에 수정이 필요할 부분이 있다면 메시지를 보내주세요.</Msg>
      <Msg>• 메시지는 퀴즈 / 문제를 작성한 선생님께 전달됩니다.</Msg>
      <Wrapper>
        <div>내용</div>
        <Textarea
          cols={20}
          rows={4}
          {...register("editInfo", {
            required: true
          })}
        ></Textarea >
      </Wrapper>
      <SubmitBtn
        type="submit"
        value="메세지 보내기"
        disabled={!isValid}
      />
    </EditMsgForm>}
    {chargeMsg && <ChargeMsgForm onSubmit={handleSubmit(onSubmitChargeMsg)}>
      <Msg>• 퀴즈 / 문제에 부적절한 내용이 포함 된다면 신고해주세요.</Msg>
      <Msg>• 신고내용은 퀴즈 / 문제를 작성한 선생님과 관리자에게 전달됩니다.</Msg>
      <Msg>• 다른 사용자들에 의해 신고 내용이 10회 누적 되면 퀴즈 / 문제는 삭제됩니다.</Msg>
      <Msg>• 정상적인 게시물을 신고하게 될 경우 본인이 제재를 받을 수 있습니다.</Msg>
      <Wrapper>
        <div>신고 내용</div>
        <Textarea
          cols={20}
          rows={4}
          {...register("chargeInfo", {
            required: true
          })}
        ></Textarea >
      </Wrapper>
      <SubmitBtn
        type="submit"
        value="신고하기"
        disabled={!isValid}
      />
    </ChargeMsgForm>}
  </SendMsgLayout>);
}

export default SendEditDChargeMsg;