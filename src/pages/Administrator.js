import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AdminPage from '../components/AdminPage/AdminPage';
import NavBtn from '../components/NavBtn';
import dotenv from "dotenv"
dotenv.config()

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const CheckPasswordForm = styled.form`
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  row-gap: 20px;
  div {
    grid-column: 1 / -1;
    text-align: center;
  }
  input {
    background-color: rgb(200, 200, 200, 0.4);
    color: ${props => props.theme.color};
    padding: 10px 20px;
    border-radius: 5px;
  }
`

const Administrator = () => {
  const [confirm, setConfirm] = useState(false)
  const adminPassword = process.env.REACT_APP_ADMIM
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const { password } = data
    if (password === adminPassword) {
      setConfirm(true)
    }
  }
  return (<Container>
    {!confirm && <CheckPasswordForm onSubmit={handleSubmit(onSubmit)}>
      <div>관리자 비밀번호 입력</div>
      <input
        {...register("password")}
        type="password"
        autoComplete="off"
      />
      <input
        style={{ cursor: 'pointer' }}
        type="submit"
        value="확인" />
    </CheckPasswordForm>}
    {confirm && <AdminPage />}
    <NavBtn />
  </Container>);
}

export default Administrator;