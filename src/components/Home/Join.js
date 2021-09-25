import React from 'react';
import styled from 'styled-components';
import { HomeContentsLayoutGsap } from '../../hooks/Gsap';
import useUser from '../../hooks/useUser';
import LinkBtn from '../LinkBtn';
import Title from './Title';

const Layout = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 400px;
`

const Box = styled.div`
  grid-column: ${props => props.position === "left" ? 1 / 2 : 2 / 3};
  grid-row: 2 / 3;
  background-color: ${props => props.position === "left" ? "rgb(67, 216, 122, 0.2)" : "rgb(146, 248, 185, 0.2)"};;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
  margin-bottom: 40px;
`

const BoxTitle = styled.div`
  font-size: 24px;
`

const Msg = styled.div`
  margin-top: 20px;
  font-size: 18px;
  margin-bottom: 50px;
`

const Join = () => {
  const user = useUser()
  return (
    <Layout className="joinContainer">
      <HomeContentsLayoutGsap layout="joinContainer" />
      <Title
        title={user ? `Welcome ${user?.username}` : "Account"}
        msg={user ? "Ready to enjoy QUIZ HI?" : "Create Quiz with QUIZ HI"} left={true} />
      <Box position="left">
        <BoxTitle>{user ? "퀴즈를 만들어 볼까요?" : "계정 있으신가요?"}</BoxTitle>
        <Msg>{user ? "멋진 퀴즈를 만들고 다른 사람들에게 공유해주세요!" : "로그인하여 당신의 퀴즈를 공유해주세요!"}</Msg>
        <LinkBtn route={user ? "make-quiz" : "login"} text={user ? "퀴즈만들기" : "로그인하기"} />
      </Box>
      <Box>
        <BoxTitle>{user ? "퀴즈를 진행하시겠어요?" : "계정 없으신가요?"}</BoxTitle>
        <Msg>{user ? "퀴즈를 선택해 다른 사람들과 함께 풀어보세요!" : "회원가입하여 함께 퀴즈를 만드시는건 어때요?"}</Msg>
        <LinkBtn route={user ? "play-quiz" : "create-account"} text={user ? "퀴즈진행하기" : "회원가입하기"} />
      </Box>
    </Layout>
  );
}

export default Join;