import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { AccountContainerGsap } from '../../hooks/Gsap';

const Container = styled.div`
  position: absolute;
  min-height: 100vh;
  width: 100%;
  left: 0;
  top: 0;
  background-color: rgb(63, 63, 63, 0.9);
  background-color: ${props => props.theme.blurBgColor};
  color: ${props => props.theme.fontColor};
`

const Wapper = styled.div`
  width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
`

const TopContents = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  padding: 0px 30px;
  margin-top: 40px;
`

const PageTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 10px;
`

const CloseBtn = styled.div`
  svg {
    cursor: pointer;
    color: rgb(255, 99, 80);
  }
`

const QusetionContainer = ({ children, pageTitle, setQuestionMode }) => {
  const onClickQuestionMode = () => {
    setQuestionMode(false)
  }
  return (<Container className="questionContainer">
    <AccountContainerGsap container="questionContainer" />
    <Wapper>
      <TopContents>
        <PageTitle>{pageTitle}</PageTitle>
        <CloseBtn><FontAwesomeIcon icon={faTimes} onClick={onClickQuestionMode} /></CloseBtn>
      </TopContents>
      {children}
    </Wapper>
  </Container>);
}

export default QusetionContainer;