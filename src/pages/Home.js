import React, { useEffect } from 'react';
import Header from '../components/Header';
import Intro from '../components/Home/Intro';
import NavIcon from '../components/Home/NavIcon';
import Join from '../components/Home/Join';
import NavBtn from '../components/NavBtn';
import AccountType from '../components/Home/AccountType';
import Level from '../components/Home/Level';
import styled from 'styled-components';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { BasicContainerGsap, HomeContainerGsap } from '../hooks/Gsap';
import useUser from '../hooks/useUser';
import { useHistory } from 'react-router';
import useTitle from '../hooks/useTitle';
gsap.registerPlugin(ScrollTrigger)

const HomeContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  row-gap: 60px;
  position: relative;
`

const Home = () => {
  const titleUpdataer = useTitle("QUIZ HI | 홈")
  return (
    <React.Fragment>
      <Header />
      <HomeContainer className="homeContainer">
        <HomeContainerGsap />
        <Intro />
        <NavIcon />
        <AccountType />
        <Level />
        <Join />
      </HomeContainer>
      <NavBtn />
    </React.Fragment>
  );
}

export default Home;