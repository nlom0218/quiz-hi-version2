import React from 'react';
import styled from 'styled-components';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { BasicContainerGsap } from '../hooks/Gsap';
gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  row-gap: 20px;
  position: relative;
`

const Empty = styled.div`
  height: 50px;
`

const BasicContainer = ({ children }) => {
  return (<React.Fragment>
    <Container className="basicContainer">
      <BasicContainerGsap />
      {children}
    </Container>
    <Empty></Empty>
  </React.Fragment>);
}

export default BasicContainer;