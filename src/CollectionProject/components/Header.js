import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
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
  grid-template-columns: auto 1fr;
  position: relative;
  svg {
    color: ${props => props.theme.bgColor};
    transition: color 1s ease;
    cursor: pointer;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: auto auto 1fr;
  `}
`

const HomeIcon = styled.div`
`

const Title = styled.div`
  display: none;
  color: ${props => props.theme.bgColor};
  transition: color 1s ease;
  font-weight: 600;
  ${customMedia.greaterThan("tablet")`
    display: block;
    margin-left: 20px;
    margin-left: 1.25rem;
  `}
`

const MenuBar = styled.div`
  justify-self: end;
`

const Header = () => {
  const [seeMenu, setSeeMenu] = useState(false)
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })
  const onClickMenu = () => { setSeeMenu(prev => !prev) }
  const possibleMenu = () => {
    if (isDesktop) {
      return true
    } else {
      if (seeMenu) {
        return true
      }
    }
    return false
  }
  return (<Container>
    <HomeIcon><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></HomeIcon>
    <Title>QUIZ HI Collection</Title>
    {!isDesktop && <MenuBar onClick={onClickMenu}><FontAwesomeIcon icon={faBars} /></MenuBar>}
    {possibleMenu() && <Contents />}
  </Container>);
}

export default Header;