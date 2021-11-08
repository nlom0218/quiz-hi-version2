import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import NavBtn from '../../../components/NavBtn';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 100px auto 100px;
  background: linear-gradient(
    ${props => props.theme.gradient}
  ),url("https://source.unsplash.com/random/1920*1080?school");
  background-size: cover;
  background-position: center;
`

const Header = styled.div`
  display: grid;
  padding: 20px;
  padding: 1.25rem;
  justify-content: end;
`

const MenuBtn = styled.div`
  color: ${props => props.theme.fontColor};
  font-size: 20px;
  font-size: 1.25rem;
  cursor: pointer;
`

const Content = styled.div`
  /* background: blue; */
`

const Footer = styled.div`
  /* background: yellow; */
`

const Experiment = () => {
  return (<Container>
    <NavBtn />
    <Header>
      <MenuBtn><FontAwesomeIcon icon={faBars} /></MenuBtn>
    </Header>
    <Content>
    </Content>
    <Footer></Footer>
  </Container>);
}

export default Experiment;