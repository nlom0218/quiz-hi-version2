import React from 'react';
import styled from 'styled-components';
import { faSearch, faMoon, faPencilAlt, faPlay, faUser, faSignOutAlt, faSun, faSignInAlt, faBookReader } from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faListAlt } from "@fortawesome/free-regular-svg-icons"
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
  grid-template-columns: 8fr 1fr 1fr;
`

const Nav = styled.li`
  display: flex;
  justify-content: flex-end;
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
  justify-self: flex-start;
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

const StudentHeader = () => {
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
    history.push("/")
    logOutUser()
  }
  return (<SHeader className="headerContainer">
    <HeaderContainerGsap />
    <List>
      <SiteName type={user?.type}>
        <SiteNameText><Link to={`/profile/${user?.username}/info`}>quiz Hi</Link></SiteNameText>
      </SiteName>
      <Nav>
        <FontAwesomeIcon
          icon={darkMode ? faSun : faMoon}
          onClick={onCLickDarkMode}
          style={{ color: `${darkMode ? "#ff765e" : "#212121"}` }}
        />
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

export default StudentHeader;