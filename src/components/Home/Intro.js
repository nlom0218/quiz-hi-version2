import React from 'react';
import styled from 'styled-components';
import introImg from "../../images/Home/intro.jpg"

const SIntro = styled.div`
 grid-column: 1 / 13;
 position: relative;
`

const IntroImg = styled.img`
  width: 100%;
  height: 800px;
`

const IntroText = styled.div`
  position: absolute;
  top: 0;
  width: 1200px;
  height: 800px;
  background-color: ${props => props.theme.blurColor};
  transition: background-color 1s linear;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const IntroTitle = styled.div`
  font-size: 36px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 10px;
`

const IntroMsg = styled.div`
  font-size: 18px;
  margin-top: 20px;
  position:relative;
  font-weight: 600;
`

const Intro = () => {
  return (<SIntro className="introContainer">
    <IntroImg src={introImg} />
    <IntroText>
      <IntroTitle>WelCome To Quiz Hi</IntroTitle>
      <IntroMsg>
        QUIZ HI에 오신 여러분들을 환영합니다!
      </IntroMsg>
    </IntroText>
  </SIntro>);
}

export default Intro;