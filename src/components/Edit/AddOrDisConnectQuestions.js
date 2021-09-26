import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 120px;
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  transition: border 1s ease;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  margin-bottom: 80px;
`

const AddOrDisConnectQuestions = ({ children }) => {
  return (<Container>
    {children}
  </Container>);
}

export default AddOrDisConnectQuestions;