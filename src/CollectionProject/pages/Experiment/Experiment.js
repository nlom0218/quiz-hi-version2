import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { FcNews, FcCalendar, FcTodoList, FcGrid, FcBookmark, FcDown, FcUp } from "react-icons/fc";
import NavBtn from './NavBtn';
import { Link, useParams } from 'react-router-dom';
import News from './News';
import { weatherBtnDown, weatherDown, weatherUp, weatherBtnUp } from '../../../animation/fade';
import { customMedia } from '../../../styles';
import bgImg from "./body_bg.png"

const Container = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 100px;
  background: url(${bgImg});
  min-height: 100vh;
  ${customMedia.greaterThan("desktop")`
    height: 100vh;
    background: linear-gradient(
      ${props => props.theme.gradient}
    ),url("https://source.unsplash.com/random/1920*1080?nature");
    background: url("https://source.unsplash.com/random/1920*1080?nature");
    background-size: cover;
    background-position: center;
    `}
  color: ${props => props.theme.fontColor};
  transition: color 1s ease;
`

const Header = styled.div`
  width: 100%;
  display: grid;
  padding: 20px;
  padding: 1.25rem;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-start;
`

const Weather = styled.div`
  justify-self: flex-start;
`

const WeatherBtn = styled.div`
  position: absolute;
  top: 20px;
  top: 1.25rem;
  left: 20px;
  left: 1.25rem;
  cursor: pointer;
  font-size: 1.5em;
  font-size: 1.5rem;
  background: #e8e8e8;
  border-radius: 50%;
  transition: background 1s ease;
  animation: ${props => props.firstEnter ? "none" : props.seeWeather ? weatherBtnDown : weatherBtnUp} 1s ease forwards;
`

const WeatherContent = styled.div`
  position: absolute;
  top: -36px;
  top: -2.25rem;
  animation: ${props => props.firstEnter ? "none" : props.seeWeather ? weatherDown : weatherUp} 1s ease forwards;
  background: ${props => props.theme.bgColor};
  transition: background 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
`

const PageBtn = styled.div`
  justify-self: center;
  font-size: 2.75em;
  font-size: 2.75rem;
  svg {
    cursor: pointer;
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  ${customMedia.greaterThan("desktop")`
    padding: 5px 20px;
    background: ${props => props.theme.bgColor};
    border-radius: 5px;
    transition: background 1s ease; 
  `}
`

const MenuBtn = styled.div`
  font-size: 20px;
  font-size: 1.25rem;
  cursor: pointer;
  justify-self: flex-end;
  padding: 5px;
  padding: 0.3125rem;
  /* :hover { */
    background: ${props => props.theme.bgColor};
    border-radius: 5px;
    border-radius: 0.3125rem;
    transition: background 1s ease;
  /* } */
`

const Content = styled.div`
  margin: 0 auto;
  /* width: 1200px;
  width: 75rem;
  min-width: 1200px;
  width: 75rem; */
  width: 100%;
  max-width: 75rem;
  display: grid;
  /* background: blue; */
`

const Footer = styled.div`
  /* background: yellow; */
`

const Experiment = () => {
  const { page } = useParams()
  const [seeWeather, setSeeWeather] = useState(false)
  const [firstEnter, setFirstEnter] = useState(true)
  const onClickWeatherBtn = () => {
    setSeeWeather(prev => !prev)
    setFirstEnter(false)
  }
  return (
    <Container>
      <NavBtn />
      <Header>
        <Weather>
          <WeatherBtn onClick={onClickWeatherBtn} seeWeather={seeWeather} firstEnter={firstEnter}>{seeWeather ? <FcUp /> : <FcDown />}</WeatherBtn>
          <WeatherContent seeWeather={seeWeather} firstEnter={firstEnter}>춘천시 4˚ 흐림 미세먼지 좋음</WeatherContent>
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