import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { customMedia } from '../../styles';

const Container = styled.div`
  grid-column: 1 / -1;
  background-color: ${props => props.theme.fontColor};
  padding: 20px 30px;
  padding: 20px 1.875rem;
  transition: background-color 1s ease;
  ${customMedia.greaterThan("tablet")`
    display: flex;
  `}
`

const HomeIcon = styled.div`
  svg {
    color: ${props => props.theme.bgColor};
    transition: color 1s ease;
  }
`

const Title = styled.div`
  display: none;
  color: ${props => props.theme.bgColor};
  transition: color 1s ease;
  ${customMedia.greaterThan("tablet")`
    display: block;
    margin-left: 20px;
    margin-left: 1.25rem;
  `}
`

const Header = () => {
  return (<Container>
    <HomeIcon><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></HomeIcon>
    <Title>QUIZ HI Collection</Title>
  </Container>);
}

export default Header;