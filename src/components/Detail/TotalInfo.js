import { faBook, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const STotalInfo = styled.div`
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: repeat(3, auto) 1fr;
  column-gap: 20px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  svg {
    margin-right: 10px;
  }
`

const Text = styled.div``

const TotalInfo = ({ totalQuizzes, totalQuestions, totalFollowUsers }) => {
  return (<STotalInfo>
    <Wrapper>
      <FontAwesomeIcon icon={faBook} />
      <Text>{totalQuizzes}개의 퀴즈</Text>
    </Wrapper>
    <Wrapper>
      <FontAwesomeIcon icon={faBookOpen} />
      <Text>{totalQuestions}개의 문제</Text>
    </Wrapper>
    <Wrapper>
      <FontAwesomeIcon icon={faUser} />
      <Text>{totalFollowUsers}명의 팔로워</Text>
    </Wrapper>
  </STotalInfo>);
}

export default TotalInfo;