import React from 'react';
import styled from 'styled-components';
import { faMoon, faPencilAlt, faPlay, faUser, faSignOutAlt, faSun, faSignInAlt, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faNewspaper } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import headerNav from "../animation/headerNav"
import { Link, useHistory } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { darkModeVar, disableDarkMode, enableDarkMode, isLoggedInVar, logOutUser } from '../apollo';
import useUser from '../hooks/useUser';
import { HeaderContainerGsap } from '../hooks/Gsap';


const SHeader = styled.div`
`

const List = styled.ul`
  width: 1000px;
  margin: 0 auto;
  padding-top: 40px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`

const Nav = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 16px;
    cursor: pointer;
    &:hover {
      animation: ${headerNav} 1.5s linear infinite forwards;
    }
  }
  :last-child {
    grid-column: -2 / -1;
  }
`

const SiteName = styled.li`
  grid-column: 5 / span 2;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SiteNameText = styled.span`
  cursor: pointer;
  font-size: 24px;
  letter-spacing: 10px;
  font-weight: 600;
  text-transform: uppercase;
`

const AvatarImage = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: fill;
`

const Header = () => {
  const history = useHistory()
  const darkMode = useReactiveVar(darkModeVar)
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const user = useUser()
  const onCLickDarkMode = () => {
    if (darkMode === true) {
      disableDarkMode()
    } else if (darkMode === false) {
      enableDarkMode()
    }
  }
  const onClickAccount = () => {
    localStorage.clear()
    history.push("/")
    logOutUser()
  }
  const profileIcon = () => {
    if (!isLoggedIn) {
      return true
    }
    if (user?.avatarURL === null) {
      return true
    }
    return false
  }
  const onCLickPalyQuiz = () => {
    localStorage.removeItem("startQuiz")
    localStorage.removeItem("joinStudent")
    localStorage.removeItem("questionNum")
    localStorage.removeItem("selectMode")
    localStorage.removeItem("selectQuizTitle")
    localStorage.removeItem("selectQuiz")
    localStorage.removeItem("quizList")
    localStorage.removeItem("targetScore")
    history.push("/play-quiz")
    window.location.reload()
  }
  return (<SHeader className="headerContainer">
    <HeaderContainerGsap />
    <List>
      <Nav>
        <FontAwesomeIcon
          icon={darkMode ? faSun : faMoon}
          onClick={onCLickDarkMode}
          style={{ color: `${darkMode ? "#ff765e" : "#212121"}` }}
        />
      </Nav>
      <Nav>
        <a
          href="https://quiz-hi.co.kr/pages/%ED%80%B4%EC%A6%88-%ED%95%98%EC%9D%B4-%EC%84%A4%EB%AA%85%EC%84%9C"
          target="_blank">
          <FontAwesomeIcon icon={faNewspaper} />
        </a>
      </Nav>
      <Nav><Link to="/feed/quiz/all/recent/1"><FontAwesomeIcon icon={faClipboard} /></Link></Nav>
      <Nav><Link to="/library/quiz/1"><FontAwesomeIcon icon={faBookReader} /></Link></Nav>
      <SiteName type={user?.type}>
        <SiteNameText><Link to="/">quiz Hi</Link></SiteNameText>
      </SiteName>
      <Nav><Link to="/make-quiz"><FontAwesomeIcon icon={faPencilAlt} /></Link></Nav>
      <Nav><Link to="/play-quiz" onClick={onCLickPalyQuiz}><FontAwesomeIcon icon={faPlay} /></Link></Nav>
      <Nav>
        <Link to={`/profile/${user?.username}/info`}>
          {profileIcon() ?
            <FontAwesomeIcon icon={faUser} />
            :
            <AvatarImage src={user?.avatarURL} />
          }
        </Link>
      </Nav>
      <Nav>
        {isLoggedIn ?
          <FontAwesomeIcon icon={faSignOutAlt} onClick={onClickAccount} />
          :
          <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} /></Link>
        }
      </Nav>
    </List>
  </SHeader >);
}

export default Header;