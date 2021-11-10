import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { FcNews, FcCalendar, FcTodoList, FcGrid, FcBookmark } from "react-icons/fc";
import NavBtn from './NavBtn';
import { Link, useParams } from 'react-router-dom';
import News from './News';

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
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-start;
`

const Weather = styled.div`
  background: ${props => props.theme.bgColor};
  transition: background 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  justify-self: flex-start;
`

const PageBtn = styled.div`
  justify-self: center;
  font-size: 2.25em;
  font-size: 2.25rem;
  svg {
    cursor: pointer;
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const MenuBtn = styled.div`
  font-size: 20px;
  font-size: 1.25rem;
  cursor: pointer;
  justify-self: flex-end;
  padding: 5px;
  padding: 0.3125rem;
  :hover {
    background: ${props => props.theme.bgColor};
    border-radius: 5px;
    border-radius: 0.3125rem;
    transition: background 0.5s ease;
  }
`

const Content = styled.div`
  /* background: blue; */
`

const Footer = styled.div`
  /* background: yellow; */
`

const Experiment = () => {
  const { page } = useParams()
  console.log(page);
  return (
    <Container>
      <NavBtn />
      <Header>
        <Weather>
          춘천시 4˚ 흐림 미세먼지 좋음
        </Weather>
        <PageBtn>
          <Link to="/experiment"><FcNews /></Link>
          <Link to="/experiment/todo"><FcTodoList /></Link>
          <Link to="/experiment/calendar"><FcCalendar /></Link>
          <Link to="/experiment/link"><FcBookmark /></Link>
          <Link to="/experiment/menu"><FcGrid /></Link>
        </PageBtn>
        <MenuBtn><FontAwesomeIcon icon={faBars} /></MenuBtn>
      </Header>
      <Content>
        {!page && <News />}
      </Content>
      <Footer></Footer>
    </Container>);
}

export default Experiment;