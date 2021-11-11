import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../../styles';
import { FcAlarmClock, FcDonate, FcRefresh } from "react-icons/fc";
import { GiForkKnifeSpoon, GiNotebook, GiBowlOfRice } from "react-icons/gi";
import { BsTable } from "react-icons/bs";

const Container = styled.div`
 display: grid;
 grid-template-columns: 1fr 1fr;
 padding: 30px 0px;
 padding: 1.875rem 0rem;
 width: 90%;
 margin: 0 auto;
 row-gap: 60px;
 row-gap: 3.75rem;
 column-gap: 30px;
 column-gap: 1.875rem;
 background: ${props => props.theme.blurColor};
 transition: background 1s ease;
 border-radius: 10px;
 border-radius: 0.625rem;
 align-content: flex-start;
 justify-items: center;
 ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr;
    `}
   ${customMedia.greaterThan("desktop")`
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  `}
`

const Icon = styled.div`
  svg {
    font-size: 40px;
  }
`

const FunctionPage = () => {
  // 타이머, 랜덤뽑기, 자리 바꾸기, 급식 순서 정하기, 시간표, 식단표, 학급 일지
  return (<Container>
    <Icon><FcAlarmClock /></Icon>
    <Icon><FcDonate /></Icon>
    <Icon><FcRefresh /></Icon>
    <Icon><GiBowlOfRice /></Icon>
    <Icon><GiForkKnifeSpoon /></Icon>
    <Icon><BsTable /></Icon>
    <Icon><GiNotebook /></Icon>
    <Icon><FcAlarmClock /></Icon>
    <Icon><FcDonate /></Icon>
    <Icon><FcRefresh /></Icon>
    <Icon><GiBowlOfRice /></Icon>
    <Icon><GiForkKnifeSpoon /></Icon>
    <Icon><BsTable /></Icon>
    <Icon><GiNotebook /></Icon>
    <Icon><FcAlarmClock /></Icon>
    <Icon><FcDonate /></Icon>
    <Icon><FcRefresh /></Icon>
    <Icon><GiBowlOfRice /></Icon>
    <Icon><GiForkKnifeSpoon /></Icon>
    <Icon><BsTable /></Icon>
    <Icon><GiNotebook /></Icon>
    <Icon><FcAlarmClock /></Icon>
    <Icon><FcDonate /></Icon>
    <Icon><FcRefresh /></Icon>
    <Icon><GiBowlOfRice /></Icon>
    <Icon><GiForkKnifeSpoon /></Icon>
    <Icon><BsTable /></Icon>
    <Icon><GiNotebook /></Icon>
    <Icon><FcAlarmClock /></Icon>
    <Icon><FcDonate /></Icon>
    <Icon><FcRefresh /></Icon>
    <Icon><GiBowlOfRice /></Icon>
    <Icon><GiForkKnifeSpoon /></Icon>
    <Icon><BsTable /></Icon>
    <Icon><GiNotebook /></Icon>
    <Icon><FcAlarmClock /></Icon>
    <Icon><FcDonate /></Icon>
    <Icon><FcRefresh /></Icon>
    <Icon><GiBowlOfRice /></Icon>
    <Icon><GiForkKnifeSpoon /></Icon>
    <Icon><BsTable /></Icon>
    <Icon><GiNotebook /></Icon>
    <Icon><FcAlarmClock /></Icon>
    <Icon><FcDonate /></Icon>
    <Icon><FcRefresh /></Icon>
    <Icon><GiBowlOfRice /></Icon>
    <Icon><GiForkKnifeSpoon /></Icon>
    <Icon><BsTable /></Icon>
    <Icon><GiNotebook /></Icon>
    <Icon><FcAlarmClock /></Icon>
    <Icon><FcDonate /></Icon>
    <Icon><FcRefresh /></Icon>
    <Icon><GiBowlOfRice /></Icon>
    <Icon><GiForkKnifeSpoon /></Icon>
    <Icon><BsTable /></Icon>
    <Icon><GiNotebook /></Icon>
    <Icon><FcAlarmClock /></Icon>
    <Icon><FcDonate /></Icon>
    <Icon><FcRefresh /></Icon>
    <Icon><GiBowlOfRice /></Icon>
    <Icon><GiForkKnifeSpoon /></Icon>
    <Icon><BsTable /></Icon>
    <Icon><GiNotebook /></Icon>

  </Container>);
}

export default FunctionPage;