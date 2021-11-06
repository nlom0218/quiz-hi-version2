import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';

const SContents = styled.div`
  width: 100%;
  position: absolute;
  top: 51px;
  top: 3.1875rem;
  background-color: ${props => props.theme.fontColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 0px 30px;
  padding: 0px 1.875rem;
  ${customMedia.greaterThan("desktop")`
    position: static;
    padding: 0px;
    margin-left: 30px;
    margin-left: 1.875rem;
  `}
`

const ContentsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
  ${customMedia.greaterThan("desktop")`
    display: flex;
  `}
`

const ContentsItem = styled.li`
  font-size: 0.875em;
  font-size: 0.875rem;
  cursor: pointer;
  ${customMedia.greaterThan("desktop")`
    margin-left: 30px;
    margin-left: 1.875rem;
  `}
`

const ItemDot = styled.span`
  margin-right: 10px;
  margin-right: 0.625rem;
`

const Contents = () => {
  return (<SContents>
    <ContentsList>
      <ContentsItem><ItemDot>•</ItemDot> 스피드 퀴즈</ContentsItem>
      <ContentsItem><ItemDot>•</ItemDot> 스피드 퀴즈</ContentsItem>
      <ContentsItem><ItemDot>•</ItemDot> 스피드 퀴즈</ContentsItem>
      <ContentsItem><ItemDot>•</ItemDot> 스피드 퀴즈</ContentsItem>
    </ContentsList>
  </SContents>);
}

export default Contents;