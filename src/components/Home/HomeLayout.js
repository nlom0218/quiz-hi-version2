import React from 'react';
import styled from 'styled-components';
import { HomeContentsLayoutGsap } from '../../hooks/Gsap';
import Title from './Title';

const Layout = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 400px;
`

const HomeLayout = ({ children, className, layout, title, msg, left }) => {
  return (<Layout className={className}>
    <HomeContentsLayoutGsap layout={layout} />
    <Title title={title} msg={msg} left={left} />
    {children}
  </Layout>);
}

export default HomeLayout;