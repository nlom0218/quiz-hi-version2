import React from 'react';
import styled from 'styled-components';
import NavBtn from '../../components/NavBtn';
import Header from '../components/Header';

const Container = styled.div`
  display: grid;
  
`

const Main = () => {
  return (<Container>
    <Header />
    {/* <Header></Header>
    <Contents></Contents> */}
    <NavBtn />
  </Container>);
}

export default Main;