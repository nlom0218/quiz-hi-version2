import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import Contents from './Contents';

const Container = styled.div`
  grid-column: 1 / -1;
  background-color: ${props => props.theme.fontColor};
  padding: 0px 30px;
  padding: 0px 1.875rem;
  height: 50px;
  height: 3.125rem;
  line-height: 50px;
  line-height: 3.125rem;
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: auto auto 1fr;
  position: relative;
  box-shadow: 0px 1px 1px #4f4f4f;
  svg {
    color: ${props => props.theme.bgColor};
    transition: color 1s ease;
    cursor: pointer;
  }
`

const HomeIcon = styled.div`
`

const Title = styled.div`
  color: ${props => props.theme.bgColor};
  transition: color 1s ease;
  font-weight: 600;
  margin-left: 20px;
  margin-left: 1.25rem;
`

const MenuBar = styled.div`
  justify-self: end;
`

const Header = ({ setMoveBot, isDesktop }) => {
  const [seeMenu, setSeeMenu] = useState(false)
  const [initMenu, setInitMenu] = useState(true)
  const onClickMenu = () => {
    setSeeMenu(prev => !prev)
    setInitMenu(false)
    setMoveBot(prev => !prev)
  }
  const desktopMenu = () => {
    if (isDesktop) {
      return true
    } else {
      if (!initMenu) {
        return true
      }
    }
    return false
  }
  return (<Container>
    <HomeIcon><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></HomeIcon>
    <Title>QUIZ HI Collection</Title>
    {!isDesktop && <MenuBar onClick={onClickMenu}><FontAwesomeIcon icon={faBars} /></MenuBar>}
    {desktopMenu() && <Contents seeMenu={seeMenu} />}
  </Container>);
}

export default Header;