import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 40px;
  grid-gap: 20px;
`

const Title = styled.div`
  /* background-color: red; */
`

const Description = styled.div`
  margin-top: 20px;
  padding-left: 20px;
  line-height: 25px;
`

const Emphasis = styled.div`
  margin-top: 20px;
  padding-left: 20px;
  line-height: 25px;
  color: rgb(255, 99, 80);
  font-weight: 600;
`

const HomeQuestion = () => {
  return (<Container>
    <div>
      <Title>1. 사용자 유형을 선택하세요.</Title>
      <Description>왼쪽의 선생님, 학생, 일반인 중 하나를 선택하세요. 선택된 유형은 다른 유형들보다 색이 짙습니다.</Description>
    </div>
    <div>
      <Title>2. 아이디와 비밀번호를 입력하세요.</Title>
      <Description>아이디와 비밀번호를 입력하면 로그인 버튼이 활성화 됩니다.
      아이디와 비밀번호가 생각이 안 나는 경우 로그인 아래 "아이디, 비밀번호 찾기"를 클릭하여 다음 과정을 진행해주세요.
      </Description>
      <Emphasis>아이디 및 비밀번호가 틀릴 경우 화면 아래에 메세지가 나타납니다.</Emphasis>
      <Description>
        <FontAwesomeIcon icon={faEye} /> 비밀번호가 보여진 상태입니다.
      </Description>
      <Description>
        <FontAwesomeIcon icon={faEyeSlash} /> 비밀번호가 가려진 상태입니다.
      </Description>
    </div>
    <div>
      <Title>• 네비게이션 아이콘</Title>
      <Description>
        <FontAwesomeIcon icon={faHome} /> 시작화면으로 돌아갑니다.(홈화면)
      </Description>
      <Description>
        <FontAwesomeIcon icon={faMoon} /> 다크모드로 바뀝니다.
      </Description>
      <Description>
        <FontAwesomeIcon icon={faSun} /> 라이트모드로 바뀝니다.
      </Description>
      <Description>
        N 회원가입 페이지로 이동합니다.
      </Description>
    </div>
  </Container>);
}

export default HomeQuestion;