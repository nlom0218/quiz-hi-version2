import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import NavBtn from '../../components/NavBtn';
import Header from '../components/Header';
import Speed from './Speed';

const Container = styled.div`
  display: grid;
`

const Main = () => {
  const { type } = useParams()
  const [moveBot, setMoveBot] = useState(false)
  return (<Container>
    <Header setMoveBot={setMoveBot} />
    {type === "speed" && <Speed moveBot={moveBot} />}
    <NavBtn />
  </Container>);
}

export default Main;