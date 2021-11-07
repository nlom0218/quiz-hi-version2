import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router';
import styled from 'styled-components';
import NavBtn from '../../components/NavBtn';
import Header from '../components/Header';
import Speed from './Speed';

const Container = styled.div`
  display: grid;
`

const Main = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)"
  })
  const isTablet = useMediaQuery({
    query: "(min-width: 768px)"
  })
  const { type } = useParams()
  const [changeWidth, setChangeWidth] = useState(true)
  const [moveBot, setMoveBot] = useState(false)
  return (<Container>
    <Header setMoveBot={setMoveBot} isDesktop={isDesktop} setChangeWidth={setChangeWidth} />
    {type === "speed" && <Speed moveBot={moveBot} setChangeWidth={setChangeWidth} changeWidth={changeWidth} isTablet={isTablet} />}
    <NavBtn />
  </Container>);
}

export default Main;