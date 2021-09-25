import React, { useEffect } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const SStep = styled.div`
  grid-column: 2 / -2;
  animation: ${fadeIn} 1s linear forwards;
  margin-top: 20px;
  margin-bottom: 40px;
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  row-gap: 20px;
`

const Title = styled.div`
  font-size: 16px;
  margin-right: 10px;
  letter-spacing: 5px;
  font-weight: 600;
`

const Msg = styled.div`
  font-size: 16px;
  font-weight: 400;
`

const Step = ({ step, msg, children, frist }) => {
  useEffect(() => {
    if (frist) {
      return
    }
    window.scrollBy({
      top: 1200,
      behavior: "smooth"
    })
  }, [])
  return (<SStep>
    <Layout>
      <Title>{step}단계</Title>
      <Msg>{msg}</Msg>
      {children}
    </Layout>
  </SStep>);
}

export default Step;