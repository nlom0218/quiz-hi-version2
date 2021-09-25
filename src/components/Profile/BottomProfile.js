import React from 'react';
import styled from 'styled-components';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { BottomContainerGsap } from '../../hooks/Gsap';
gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
    grid-column: 2 / -2;
`

const BottomProfile = ({ children }) => {
  return (<Container className="bottomContainer">
    <BottomContainerGsap />
    {children}
  </Container>);
}

export default BottomProfile;