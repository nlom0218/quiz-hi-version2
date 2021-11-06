import React from 'react';
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
  console.log(type);
  return (<Container>
    <Header />
    {type === "speed" && <Speed />}
    <NavBtn />
  </Container>);
}

export default Main;