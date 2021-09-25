import React from 'react';
import styled from 'styled-components';

const Msg = styled.div`
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  padding-top: 30px;
  color: tomato;
`

const NoDataMsg = ({ content }) => {
  return (<Msg>
    라이브러리에 저장된 {content}가 없습니다.
  </Msg>);
}

export default NoDataMsg;