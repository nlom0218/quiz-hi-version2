import React from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import DeleteContainer from '../components/Delete/DeleteContainer';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import useTitle from '../hooks/useTitle';

const Contnaer = styled.div`
  grid-column: 2 / -2;
`

const Delete = () => {
  const titleUpdataer = useTitle("QUIZ HI | 삭제")
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <Contnaer>
        <DeleteContainer />
      </Contnaer>
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default Delete;