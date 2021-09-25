import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
  margin-top: 20px;
`

const PlayQuizLayout = ({ children }) => {
  return (<Layout>
    {children}
  </Layout>);
}

export default PlayQuizLayout;