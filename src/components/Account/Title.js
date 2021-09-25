import React from 'react';
import styled from 'styled-components';

const STitle = styled.div`
  grid-column: 2 / 3;
  align-self: flex-end;
  justify-self: flex-end;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  span {
    :nth-child(1){
      font-size: 24px;
      letter-spacing: 20px;
      font-weight: 600;
      text-transform: uppercase;
      align-self: center;
      margin-top: 20px;
      margin-bottom: 40px;
    }
    :nth-child(2){
      align-self: flex-end;
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 10px;
    }
  }
`

const Title = ({ page }) => {
  return (<STitle>
    <span>Quiz Hi</span>
    <span>{page}</span>
  </STitle>);
}

export default Title;