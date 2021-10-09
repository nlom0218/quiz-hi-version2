import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1 / -1;
`

const SendMsg = styled.div`
  display: grid;
  grid-template-columns: 2fr 4.5fr;
  column-gap: 20px;
`
const MsgForm = styled.form`
  display: grid;
  input {
    color: ${props => props.theme.fontColor};
    justify-self: flex-end;
    cursor: pointer;
    padding: 10px 20px;
    background-color: rgb(200, 200, 200, 0.2);
    transition: background-color 1s ease, color 1s ease;
    border-radius: 5px;
    :hover {
      background-color: rgb(77, 242, 78, 0.6);
    }
  }
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
  background-color: rgb(200, 200, 200, 0.2);
  transition: box-shadow 0.4s linear, background-color 1s ease, color 1s ease;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    outline: none;
  }
`

const AdminSuggestionDetail = ({ sender }) => {
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {

  }
  return (<Container>
    <SendMsg>
      <div>{sender}에게 답장보내기</div>
      <MsgForm onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          cols={20}
          rows={8}
          {...register("suggestion", {
            required: true
          })}
        ></Textarea >
        <input type="submit" value="메시지 보내기" />
      </MsgForm>
    </SendMsg>
  </Container>);
}

export default AdminSuggestionDetail;