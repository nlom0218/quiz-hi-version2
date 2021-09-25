import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faMoon, faPencilAlt, faPlay, faSearch, faSignInAlt, faSignOutAlt, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faListAlt, faNewspaper, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { useHistory } from 'react-router';
import { darkModeVar, disableDarkMode, enableDarkMode } from '../../apollo';
import { useReactiveVar } from '@apollo/client';
import HomeLayout from './HomeLayout';
import useUser from '../../hooks/useUser';

const Box = styled.div`
  grid-row: 2 / 3;
  background-color: rgb(140, 255, 237, 0.2);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
`

const Wapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  justify-items: center;
  transition: background-color 0.3s linear;
  cursor: pointer;
  :hover {
    background-color: rgb(140, 255, 237, 0.6);
  }
`

const BlogLink = styled.a`
  display: grid;
  grid-template-rows: 1fr 2fr;
  justify-items: center;
  transition: background-color 0.3s linear;
  div {
    transition: color 1s ease;
  }
  cursor: pointer;
  :hover {
    background-color: rgb(140, 255, 237, 0.6);
  }
`

const Icon = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  svg {
    font-size: 18px;
    margin: 0px 10px;
  }
`

const Description = styled.div`
  align-self: center;
`
const NavIcon = () => {
  const darkMode = useReactiveVar(darkModeVar)
  const history = useHistory()
  const user = useUser()
  const onClinkNavBtn = (routes) => {
    if (routes === "") {
      window.scrollTo({
        behavior: "smooth",
        top: 1,
        left: 1
      })
    }
    history.push(`/${routes}`)
  }
  const onCLickDarkMode = () => {
    if (darkMode === true) {
      disableDarkMode()
    } else if (darkMode === false) {
      enableDarkMode()
    }
  }
  return (<HomeLayout
    className="iconLayout"
    layout="iconLayout"
    title="Icons"
    msg="Navigation icons of QUIZ HI"
    left={false}
  >
    <Box>
      <Wapper onClick={onCLickDarkMode}>
        <Icon>
          <FontAwesomeIcon icon={faMoon} />
          <FontAwesomeIcon icon={faSun} />
        </Icon>
        <Description>다크모드 & 라이트모드</Description>
      </Wapper>
      <BlogLink
        href="https://quiz-hi.co.kr/pages/%ED%80%B4%EC%A6%88-%ED%95%98%EC%9D%B4-%EC%84%A4%EB%AA%85%EC%84%9C"
        target="_blank">
        <Icon>
          <FontAwesomeIcon icon={faNewspaper} />
        </Icon>
        <Description>설명서 바로가기</Description>
      </BlogLink>
      <Wapper onClick={() => onClinkNavBtn("feed/quiz/all/recent/1")}>
        <Icon>
          <FontAwesomeIcon icon={faClipboard} />
        </Icon>
        <Description>피드</Description>
      </Wapper>
      <Wapper onClick={() => onClinkNavBtn("library/quiz/1")}>
        <Icon>
          <FontAwesomeIcon icon={faBookReader} />
        </Icon>
        <Description>라이브러리</Description>
      </Wapper>
      <Wapper onClick={() => onClinkNavBtn("make-quiz")}>
        <Icon>
          <FontAwesomeIcon icon={faPencilAlt} />
        </Icon>
        <Description>퀴즈 만들기</Description>
      </Wapper>
      <Wapper onClick={() => onClinkNavBtn("play-quiz")}>
        <Icon>
          <FontAwesomeIcon icon={faPlay} />
        </Icon>
        <Description>퀴즈 진행하기</Description>
      </Wapper>
      <Wapper onClick={() => onClinkNavBtn(`profile/${user?.username}/info`)}>
        <Icon>
          <FontAwesomeIcon icon={faUser} />
        </Icon>
        <Description>프로필</Description>
      </Wapper>
      <Wapper>
        <Icon>
          <FontAwesomeIcon icon={faSignInAlt} />
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Icon>
        <Description>로그인 & 로그아웃</Description>
      </Wapper>
      <Wapper onClick={() => onClinkNavBtn("")}>
        <Icon>
          QUIZ HI
        </Icon>
        <Description>홈</Description>
      </Wapper>
      <Wapper>
        <Icon>
          <FontAwesomeIcon icon={faQuestionCircle} />
        </Icon>
        <Description>도움말</Description>
      </Wapper>
    </Box>
  </HomeLayout>);
}

export default NavIcon;