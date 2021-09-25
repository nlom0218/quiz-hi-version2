import React from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
  display: grid;
  grid-template-rows: auto;
  row-gap: 20px;
`

const Administrator = () => {
  const password = "ghdehd2580!@"
  return (<Container>관리자 페이지</Container>);
}

export default Administrator;