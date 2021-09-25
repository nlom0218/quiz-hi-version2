import React from 'react';
import styled from 'styled-components';

const Text = styled.div`
  grid-column: 1 / -1;
  margin-bottom: 10px;
  justify-self: ${props => props.left ? "flex-start" : "flex-end"};
  display: flex;
  flex-direction: column;
  align-items: ${props => props.left ? "flex-start" : "flex-end"};
`

const STitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
  letter-spacing: 5px;
`

const Msg = styled.div`
  font-size: 16px;
  font-weight: 400;
`

const Title = ({ title, msg, left }) => {
  return (<Text left={left}>
    <STitle>{title}</STitle>
    <Msg>{msg}</Msg>
  </Text>);
}

export default Title;