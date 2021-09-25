import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  row-gap: 20px;
  margin: 20px 0px;
  line-height: 160%;
  .title {
    font-weight: 600;
  }
`

const DetailNoticeContainer = ({ children }) => {
  return (<Container>
    <div className="title">알림 내용</div>
    {children}
  </Container>);
}

export default DetailNoticeContainer;