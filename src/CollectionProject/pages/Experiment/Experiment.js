import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { FcNews, FcCalendar, FcTodoList, FcGrid } from "react-icons/fc";
import NavBtn from './NavBtn';

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 100px auto 100px;
  background: linear-gradient(
    ${props => props.theme.gradient}
  ),url("https://source.unsplash.com/random/1920*1080?nature");
  background-size: cover;
  background-position: center;
  color: ${props => props.theme.fontColor};
  transition: color 1s ease;
`

const Header = styled.div`
  display: grid;
  padding: 20px;
  padding: 1.25rem;
  grid-template-columns: auto 1fr auto;
  justify-items: end;
  align-items: flex-start;
`

const Weather = styled.div`
  background: ${props => props.theme.bgColor};
  transition: background 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
`

const PageBtn = styled.div``

const MenuBtn = styled.div`
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
  return (
    <Container>
      <NavBtn />
      <Header>
        <Weather>춘천시 4˚ 흐림 미세먼지 좋음
        </Weather>
        <PageBtn>
          <FcNews />
          <FcTodoList />
          <FcCalendar />
          <FcGrid />
        </PageBtn>
        <MenuBtn><FontAwesomeIcon icon={faBars} /></MenuBtn>
      </Header>
      <Content>
      </Content>
      <Footer></Footer>
    </Container>);
}

export default Experiment;